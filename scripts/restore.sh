#!/bin/bash

# System Restore Script for Thai Enterprise Management System
# This script automates the restore process for code, schema, and data

# Exit on any error
set -e

echo "Starting system restore process..."

# Check for required environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    exit 1
fi

# Function to log with timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# 1. Schema Restore
log "Starting schema restoration..."
if psql -d "$DATABASE_URL" -f db/backup/schema.sql; then
    log "Schema restore completed successfully"
else
    log "Error: Schema restore failed"
    exit 1
fi

# 2. Data Restore
log "Starting data restoration..."
if psql -d "$DATABASE_URL" -f db/backup/data.sql; then
    log "Data restore completed successfully"
else
    log "Error: Data restore failed"
    exit 1
fi

# 3. Run Verification
log "Running verification process..."
if npm run db:verify; then
    log "Verification completed successfully"
else
    log "Error: Verification failed"
    exit 1
fi

# 4. Generate Verification Report
TIMESTAMP=$(date +"%Y-%m-%d")
REPORT_PATH="db/backup/verification-report-$TIMESTAMP.json"

log "Generating verification report at $REPORT_PATH"
node db/backup/verify.ts > "$REPORT_PATH"

log "Restore process completed successfully!"
log "Please check $REPORT_PATH for detailed verification results"

# Final status check
echo "==============================================="
echo "Restore Process Summary:"
echo "- Schema Restore: ✓"
echo "- Data Restore: ✓"
echo "- Verification: ✓"
echo "- Report Generated: $REPORT_PATH"
echo "==============================================="
