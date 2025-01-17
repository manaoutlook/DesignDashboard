#!/bin/bash

# Automated Backup Script for Thai Enterprise Management System
# This script handles automated backups of schema and data

# Exit on any error
set -e

# Function to log with timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Create backup directory if it doesn't exist
BACKUP_DIR="db/backup"
mkdir -p "$BACKUP_DIR"

# Generate timestamp for backup files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Get database name from URL
DB_NAME=$(echo $DATABASE_URL | rev | cut -d'/' -f1 | rev)

# Backup schema using SQL commands
log "Starting schema backup..."
SCHEMA_BACKUP="$BACKUP_DIR/schema_$TIMESTAMP.sql"

# Create schema backup using SQL commands
psql -d "$DATABASE_URL" -t -A -c "
SELECT 
    'CREATE TABLE IF NOT EXISTS ' || tablename || ' (' ||
    string_agg(
        column_name || ' ' || data_type || 
        CASE 
            WHEN character_maximum_length IS NOT NULL 
            THEN '(' || character_maximum_length || ')'
            ELSE ''
        END ||
        CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END,
        ', '
    ) || ');'
FROM (
    SELECT 
        c.table_name AS tablename,
        c.column_name,
        c.data_type,
        c.character_maximum_length,
        c.is_nullable
    FROM 
        information_schema.columns c
    WHERE 
        table_schema = 'public'
    ORDER BY 
        c.ordinal_position
) t
GROUP BY tablename;" > "$SCHEMA_BACKUP"

if [ $? -eq 0 ]; then
    log "Schema backup completed: $SCHEMA_BACKUP"
else
    log "Error: Schema backup failed"
    exit 1
fi

# Backup data using COPY command
log "Starting data backup..."
DATA_BACKUP="$BACKUP_DIR/data_$TIMESTAMP.sql"

# Get list of tables
TABLES=$(psql -d "$DATABASE_URL" -t -A -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public';")

# Backup each table's data
for TABLE in $TABLES; do
    log "Backing up table: $TABLE"
    echo "COPY $TABLE TO STDOUT WITH CSV HEADER;" | psql -d "$DATABASE_URL" >> "$DATA_BACKUP"
    if [ $? -ne 0 ]; then
        log "Error: Failed to backup table $TABLE"
        exit 1
    fi
done

log "Data backup completed: $DATA_BACKUP"

# Create verification file
VERIFY_FILE="$BACKUP_DIR/backup_verify_$TIMESTAMP.json"
PG_VERSION=$(psql -d "$DATABASE_URL" -t -c "SHOW server_version;" | xargs)

echo "{
  \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
  \"schema_backup\": \"$SCHEMA_BACKUP\",
  \"data_backup\": \"$DATA_BACKUP\",
  \"database\": \"$DB_NAME\",
  \"pg_version\": \"$PG_VERSION\",
  \"status\": \"completed\"
}" > "$VERIFY_FILE"

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -name "schema_*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "data_*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "backup_verify_*.json" -mtime +7 -delete

log "Backup process completed successfully!"
log "Schema: $SCHEMA_BACKUP"
log "Data: $DATA_BACKUP"
log "Verification: $VERIFY_FILE"