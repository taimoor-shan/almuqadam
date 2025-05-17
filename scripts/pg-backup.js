#!/usr/bin/env node

/**
 * PostgreSQL Database Backup Script
 * 
 * This script creates a backup of the PostgreSQL database using pg_dump.
 * It reads the DATABASE_URL from the .env file and creates a backup file
 * in the ./data/pg-backup directory.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get DATABASE_URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Parse the DATABASE_URL to extract connection details
const parseDbUrl = (url) => {
  try {
    const regex = /postgres:\/\/([^:]+):([^@]+)@([^:]+):?(\d+)?\/([^?]+)/;
    const match = url.match(regex);
    
    if (!match) {
      throw new Error('Invalid DATABASE_URL format');
    }
    
    return {
      user: match[1],
      password: match[2],
      host: match[3],
      port: match[4] || '5432',
      database: match[5],
      sslmode: url.includes('sslmode=require') ? 'require' : 'prefer'
    };
  } catch (error) {
    console.error('Error parsing DATABASE_URL:', error.message);
    process.exit(1);
  }
};

// Create backup directory if it doesn't exist
const backupDir = path.resolve(__dirname, '../data/pg-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Generate backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

// Create the backup
const createBackup = () => {
  try {
    console.log('Starting database backup...');
    
    const dbConfig = parseDbUrl(DATABASE_URL);
    console.log(`Backing up database: ${dbConfig.database} from host: ${dbConfig.host}`);
    
    // Set environment variables for pg_dump
    const env = {
      ...process.env,
      PGUSER: dbConfig.user,
      PGPASSWORD: dbConfig.password,
      PGHOST: dbConfig.host,
      PGPORT: dbConfig.port,
      PGDATABASE: dbConfig.database
    };
    
    // Build pg_dump command
    let pgDumpCmd = `pg_dump -v`;
    
    // Add SSL mode if required
    if (dbConfig.sslmode === 'require') {
      pgDumpCmd += ` --no-password`;
    }
    
    // Add output file
    pgDumpCmd += ` -f "${backupFile}"`;
    
    console.log(`Executing: ${pgDumpCmd.replace(/--password=\S+/, '--password=****')}`);
    
    // Execute pg_dump
    execSync(pgDumpCmd, { 
      env,
      stdio: 'inherit'
    });
    
    console.log(`Backup completed successfully: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error('Backup failed:', error.message);
    process.exit(1);
  }
};

// Execute backup
createBackup();
