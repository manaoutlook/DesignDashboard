#!/usr/bin/env node

import { verifyDatabaseState, compareWithPreviousVerification } from "./verify";

async function runVerification() {
  console.log("Starting database verification...");
  
  const report = await verifyDatabaseState();
  await compareWithPreviousVerification(report);
  
  console.log("\nVerification Report:");
  console.log("-------------------");
  console.log(`Status: ${report.status}`);
  console.log(`Schema Version: ${report.schemaHash.substring(0, 8)}`);
  console.log(`Tables Verified: ${report.tablesVerified.length}`);
  
  if (report.warnings.length > 0) {
    console.log("\nWarnings:");
    report.warnings.forEach(w => console.log(`- ${w}`));
  }
  
  if (report.errors.length > 0) {
    console.log("\nErrors:");
    report.errors.forEach(e => console.log(`- ${e}`));
    process.exit(1);
  }

  console.log("\nVerification complete! Report saved to db/backup/");
}

runVerification().catch(error => {
  console.error("Verification failed:", error);
  process.exit(1);
});
