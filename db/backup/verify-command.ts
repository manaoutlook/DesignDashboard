#!/usr/bin/env node

import { verifyDatabaseState, compareWithPreviousVerification } from "./verify";
import { writeFileSync } from "fs";
import path from "path";

interface CommitReport {
  commitHash: string;
  timestamp: string;
  verificationResults: any;
  schemaChanges: any[];
  dataChanges: any[];
}

async function runVerification(commitHash?: string) {
  console.log("Starting database verification...");

  const report = await verifyDatabaseState(commitHash);
  await compareWithPreviousVerification(report);

  // Generate commit report
  const commitReport: CommitReport = {
    commitHash: commitHash || 'manual-verification',
    timestamp: new Date().toISOString(),
    verificationResults: {
      status: report.status,
      tablesVerified: report.tablesVerified,
      schemaVersion: report.schemaHash.substring(0, 8)
    },
    schemaChanges: report.schemaChanges,
    dataChanges: report.warnings.filter(w => w.includes('Row count changed') || w.includes('Data content changed'))
  };

  // Save commit report
  const reportPath = path.resolve(__dirname, `commit-report-${commitReport.timestamp.split('T')[0]}.json`);
  writeFileSync(reportPath, JSON.stringify(commitReport, null, 2));

  console.log("\nVerification Report:");
  console.log("-------------------");
  console.log(`Status: ${report.status}`);
  console.log(`Schema Version: ${report.schemaHash.substring(0, 8)}`);
  console.log(`Tables Verified: ${report.tablesVerified.length}`);

  if (report.schemaChanges.length > 0) {
    console.log("\nSchema Changes:");
    report.schemaChanges.forEach(change => {
      console.log(`- ${change.table}: ${change.type} (${change.details})`);
    });
  }

  if (report.warnings.length > 0) {
    console.log("\nWarnings:");
    report.warnings.forEach(w => console.log(`- ${w}`));
  }

  if (report.errors.length > 0) {
    console.log("\nErrors:");
    report.errors.forEach(e => console.log(`- ${e}`));
    process.exit(1);
  }

  console.log("\nVerification complete!");
  console.log(`Report saved to: ${reportPath}`);
  console.log(`Full verification details saved to: ${path.resolve(__dirname, `verification_${report.timestamp.split('T')[0]}.json`)}`);
}

// Check if running as Git hook
const isGitHook = process.argv.includes('--git-hook');
const commitHash = isGitHook ? process.argv[process.argv.indexOf('--git-hook') + 1] : undefined;

runVerification(commitHash).catch(error => {
  console.error("Verification failed:", error);
  process.exit(1);
});