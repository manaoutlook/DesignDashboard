import { db } from "@db";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { createHash } from "crypto";

interface VerificationReport {
  timestamp: string;
  schemaHash: string;
  tablesVerified: string[];
  dataSnapshot: {
    tableName: string;
    rowCount: number;
    schemaVersion: string;
  }[];
  status: "success" | "warning" | "error";
  warnings: string[];
  errors: string[];
}

export async function verifyDatabaseState() {
  const report: VerificationReport = {
    timestamp: new Date().toISOString(),
    schemaHash: "",
    tablesVerified: [],
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
        // Check if table exists and get row count
        const result = await db.execute(
          `SELECT COUNT(*) as count FROM ${table}`
        );
        
        const rowCount = result[0]?.count || 0;
        report.tablesVerified.push(table);
        report.dataSnapshot.push({
          tableName: table,
          rowCount,
          schemaVersion: report.schemaHash.substring(0, 8)
        });
      } catch (error) {
        report.status = "error";
        report.errors.push(`Failed to verify table ${table}: ${error.message}`);
      }
    }

    // Save verification report
    const reportPath = path.resolve(__dirname, `verification_${report.timestamp.split('T')[0]}.json`);
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  } catch (error) {
    report.status = "error";
    report.errors.push(`Verification failed: ${error.message}`);
    return report;
  }
}

// Add a function to compare with previous verification
export async function compareWithPreviousVerification(currentReport: VerificationReport) {
  try {
    // Find most recent verification file
    const reportFiles = readdirSync(__dirname)
      .filter(f => f.startsWith('verification_') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (reportFiles.length > 1) {
      const previousReport = JSON.parse(
        readFileSync(path.resolve(__dirname, reportFiles[1]), 'utf-8')
      );

      // Compare schema hashes
      if (previousReport.schemaHash !== currentReport.schemaHash) {
        currentReport.warnings.push('Schema has changed since last verification');
      }

      // Compare table data
      for (const current of currentReport.dataSnapshot) {
        const previous = previousReport.dataSnapshot.find(
          p => p.tableName === current.tableName
        );

        if (previous && previous.rowCount !== current.rowCount) {
          currentReport.warnings.push(
            `Row count changed for ${current.tableName}: ${previous.rowCount} -> ${current.rowCount}`
          );
        }
      }
    }
  } catch (error) {
    currentReport.warnings.push(`Failed to compare with previous verification: ${error.message}`);
  }
}
