import { scheduleJob, Job } from 'node-schedule';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);
const LOG_FILE = 'db/backup/scheduler.log';

// Create a type for backup jobs
type BackupJob = {
  name: string;
  schedule: string;
  job: Job;
};

// Ensure backup directory exists
async function initializeBackupDir(): Promise<void> {
  const backupDir = path.join(process.cwd(), 'db/backup');
  try {
    await fs.mkdir(backupDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create backup directory:', error);
    process.exit(1);
  }
}

async function log(message: string): Promise<void> {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  try {
    await fs.appendFile(LOG_FILE, logMessage);
    console.log(logMessage.trim());
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
}

async function runBackup(type: 'daily' | 'weekly'): Promise<void> {
  try {
    await log(`Starting ${type} backup...`);
    const backupScript = path.join(process.cwd(), 'scripts/backup.sh');
    const { stdout, stderr } = await execAsync(`bash ${backupScript}`);

    if (stdout) await log(stdout);
    if (stderr) await log(`Warning: ${stderr}`);

    await log(`${type} backup completed successfully`);
  } catch (error) {
    await log(`Error during ${type} backup: ${error instanceof Error ? error.message : 'Unknown error'}`);
    // In a production environment, you might want to add notification service here
  }
}

async function main(): Promise<void> {
  await initializeBackupDir();

  const backupJobs: BackupJob[] = [
    {
      name: 'Daily Backup',
      schedule: '0 2 * * *', // Every day at 2 AM
      job: scheduleJob('0 2 * * *', () => runBackup('daily'))
    },
    {
      name: 'Weekly Full Backup',
      schedule: '0 3 * * 0', // Every Sunday at 3 AM
      job: scheduleJob('0 3 * * 0', () => runBackup('weekly'))
    }
  ];

  await log('Backup scheduler started');
  for (const backupJob of backupJobs) {
    await log(`${backupJob.name} scheduled for ${backupJob.schedule}`);
  }

  // Handle process termination
  process.on('SIGTERM', async () => {
    await log('Backup scheduler shutting down');
    backupJobs.forEach(job => job.job.cancel());
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await log('Backup scheduler shutting down');
    backupJobs.forEach(job => job.job.cancel());
    process.exit(0);
  });
}

// Start the backup scheduler
main().catch(async (error) => {
  await log(`Fatal error: ${error.message}`);
  process.exit(1);
});