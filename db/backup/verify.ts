import { db } from "@db";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { createHash } from "crypto";
import { readdirSync } from "fs";
import { sql } from 'sql-template-strings';

interface VerificationReport {
  timestamp: string;
  schemaHash: string;
  gitCommitHash?: string;
  tablesVerified: string[];
  schemaChanges: {
    table: string;
    type: 'added' | 'modified' | 'removed';
    details: string;
  }[];
  dataSnapshot: {
    tableName: string;
    rowCount: number;
    schemaVersion: string;
    dataHash: string;
  }[];
  status: "success" | "warning" | "error";
  warnings: string[];
  errors: string[];
}

export async function verifyDatabaseState(gitCommitHash?: string) {
  const report: VerificationReport = {
    timestamp: new Date().toISOString(),
    schemaHash: "",
    gitCommitHash,
    tablesVerified: [],
    schemaChanges: [],
    dataSnapshot: [],
    status: "success",
    warnings: [],
    errors: [],
  };

  try {
    // Read and hash current schema
    const schemaContent = readFileSync(path.resolve(__dirname, "schema.sql"), "utf-8");
    report.schemaHash = createHash("sha256").update(schemaContent).digest("hex");

    // Verify each table in our schema
    const tables = [
      "users",
      "dashboard_metrics",
      "revenue_data",
      "activities",
      "locations",
      "cars",
      "spare_parts"
    ];

    for (const table of tables) {
      try {
        // Check if table exists and get data snapshot
        const result = await db.execute(
          sql`SELECT COUNT(*) as count, 
              encode(sha256(CAST((SELECT array_agg(ROW(t.*)) FROM ${table} t) AS text)::bytea), 'hex') as hash 
              FROM ${table}`
        );

        const { count, hash } = result.rows[0];
        report.tablesVerified.push(table);
        report.dataSnapshot.push({
          tableName: table,
          rowCount: parseInt(count),
          schemaVersion: report.schemaHash.substring(0, 8),
          dataHash: hash
        });
      } catch (error: any) {
        report.status = "error";
        report.errors.push(`Failed to verify table ${table}: ${error.message}`);
      }
    }

    // Save verification report with commit info
    const reportName = gitCommitHash 
      ? `verification_${report.timestamp.split('T')[0]}_${gitCommitHash.substring(0, 8)}.json`
      : `verification_${report.timestamp.split('T')[0]}.json`;

    const reportPath = path.resolve(__dirname, reportName);
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  } catch (error: any) {
    report.status = "error";
    report.errors.push(`Verification failed: ${error.message}`);
    return report;
  }
}

// Compare with previous verification
export async function compareWithPreviousVerification(currentReport: VerificationReport) {
  try {
    // Find most recent verification file
    const reportFiles = readdirSync(__dirname)
      .filter(f => f.startsWith('verification_') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (reportFiles.length > 1) {
      const previousReport: VerificationReport = JSON.parse(
        readFileSync(path.resolve(__dirname, reportFiles[1]), 'utf-8')
      );

      // Compare schema versions
      if (previousReport.schemaHash !== currentReport.schemaHash) {
        currentReport.warnings.push('Schema has changed since last verification');

        // Compare table structures to identify specific changes
        for (const table of currentReport.tablesVerified) {
          const currentTable = currentReport.dataSnapshot.find(t => t.tableName === table);
          const previousTable = previousReport.dataSnapshot.find(t => t.tableName === table);

          if (!previousTable) {
            currentReport.schemaChanges.push({
              table,
              type: 'added',
              details: 'New table added'
            });
          } else if (currentTable?.schemaVersion !== previousTable.schemaVersion) {
            currentReport.schemaChanges.push({
              table,
              type: 'modified',
              details: 'Table schema modified'
            });
          }
        }

        // Check for removed tables
        previousReport.tablesVerified.forEach(table => {
          if (!currentReport.tablesVerified.includes(table)) {
            currentReport.schemaChanges.push({
              table,
              type: 'removed',
              details: 'Table removed'
            });
          }
        });
      }

      // Compare table data
      for (const current of currentReport.dataSnapshot) {
        const previous = previousReport.dataSnapshot.find(
          p => p.tableName === current.tableName
        );

        if (previous) {
          if (previous.rowCount !== current.rowCount) {
            currentReport.warnings.push(
              `Row count changed for ${current.tableName}: ${previous.rowCount} -> ${current.rowCount}`
            );
          }

          if (previous.dataHash !== current.dataHash) {
            currentReport.warnings.push(
              `Data content changed for ${current.tableName}`
            );
          }
        }
      }
    }
  } catch (error: any) {
    currentReport.warnings.push(`Failed to compare with previous verification: ${error.message}`);
  }
}