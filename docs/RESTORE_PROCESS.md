# System Restore Process Documentation

This document outlines the complete process for restoring the Thai Enterprise Management System, including code, database schema, and data. The restore process is designed to be executed in a specific order to maintain data integrity and system consistency.

## Prerequisites

Before starting the restore process, ensure you have:

1. Access to the backup files in the `db/backup` directory
2. PostgreSQL database credentials (available in environment variables)
3. Node.js and npm installed
4. Git access to the repository

## 1. Code Restoration

### 1.1 Repository Restore
```bash
# Clone the repository
git clone [repository-url]
cd [repository-name]

# Install dependencies
npm install
```

### 1.2 Environment Setup
```bash
# Ensure DATABASE_URL environment variable is set
# Format: postgresql://[user]:[password]@[host]:[port]/[dbname]
```

## 2. Database Schema Restoration

The schema restoration process uses the backup file located at `db/backup/schema.sql`. This file contains the complete database structure.

### 2.1 Schema Restore Process
```bash
# Navigate to the project root
cd [project-root]

# Apply schema restore
psql -d $DATABASE_URL -f db/backup/schema.sql

# Verify schema integrity
npm run verify-schema
```

## 3. Data Restoration

The data restore process uses `db/backup/data.sql`, which contains all table data.

### 3.1 Data Restore Process
```bash
# Restore data from backup
psql -d $DATABASE_URL -f db/backup/data.sql

# Verify data integrity
npm run verify-data
```

## 4. Verification Process

After completing the restore process, run the verification script to ensure system integrity:

```bash
# Run the verification script
npm run db:verify
```

The verification script will:
1. Check database schema matches expected structure
2. Verify data integrity and relationships
3. Generate a verification report (saved as JSON)

### 4.1 Verification Report
A verification report will be generated at `db/backup/verification-report-[date].json`. This report includes:
- Schema verification status
- Data integrity check results
- Relationship validation results

## 5. Post-Restore Steps

After successful restoration:

1. Start the application:
   ```bash
   npm run dev
   ```

2. Verify critical functionalities:
   - User authentication
   - Data access and modification
   - Thai language support
   - Currency calculations

## 6. Troubleshooting

### 6.1 Schema Restore Issues
If schema restore fails:
1. Check PostgreSQL connection
2. Verify DATABASE_URL format
3. Ensure no conflicting schema exists

### 6.2 Data Restore Issues
If data restore fails:
1. Confirm schema was restored successfully
2. Check for foreign key constraints
3. Verify data file integrity

### 6.3 Verification Issues
If verification fails:
1. Review the verification report
2. Check database constraints
3. Validate data relationships

## 7. Support

For additional support:
- Review logs in `db/backup/verify.ts`
- Check the verification report
- Contact system administrator

## Important Notes

1. **Order of Operations**: Always restore in this order:
   - Code
   - Schema
   - Data
   - Run verification

2. **Backup Frequency**: 
   - Schema: On structural changes
   - Data: Daily incremental, weekly full
   - Code: On repository updates

3. **Security**:
   - Keep backup files secure
   - Manage access credentials carefully
   - Monitor restore logs

4. **Language Support**:
   - Verify Thai character encoding
   - Check currency formatting
   - Test bilingual features

## Emergency Contacts

For urgent restore issues:
- System Administrator: [Contact Details]
- Database Administrator: [Contact Details]
- Technical Support: [Contact Details]
