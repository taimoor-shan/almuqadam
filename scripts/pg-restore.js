#!/usr/bin/env node

/**
 * PostgreSQL Database Restore Script
 * 
 * This script restores a PostgreSQL database from a backup file using pg_restore.
 * It reads the DATABASE_URL from the .env file and restores from a specified
 * backup file in the ./data/pg-backup directory.
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

// Get backup file path from command line arguments
const getBackupFile = () => {
  const backupDir = path.resolve(__dirname, '../data/pg-backup');
  
  // If a specific file is provided as an argument
  if (process.argv.length > 2) {
    const filePath = process.argv[2];
    const fullPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Backup file not found: ${fullPath}`);
      process.exit(1);
    }
    
    return fullPath;
  }
  
  // Otherwise, use the most recent backup file
  if (!fs.existsSync(backupDir)) {
    console.error(`Backup directory not found: ${backupDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(backupDir)
    .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
    .map(file => ({
      name: file,
      path: path.join(backupDir, file),
      time: fs.statSync(path.join(backupDir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
  
  if (files.length === 0) {
    console.error('No backup files found');
    process.exit(1);
  }
  
  console.log(`Using most recent backup file: ${files[0].name}`);
  return files[0].path;
};

// Restore the database
const restoreDatabase = () => {
  try {
    const backupFile = getBackupFile();
    console.log('Starting database restore...');
    
    const dbConfig = parseDbUrl(DATABASE_URL);
    console.log(`Restoring to database: ${dbConfig.database} on host: ${dbConfig.host}`);
    
    // Set environment variables for psql
    const env = {
      ...process.env,
      PGUSER: dbConfig.user,
      PGPASSWORD: dbConfig.password,
      PGHOST: dbConfig.host,
      PGPORT: dbConfig.port,
      PGDATABASE: dbConfig.database
    };
    
    // For SQL files, use psql instead of pg_restore
    const restoreCmd = `psql -v ON_ERROR_STOP=1 -f "${backupFile}"`;
    
    console.log(`Executing: ${restoreCmd}`);
    
    // Execute restore command
    execSync(restoreCmd, { 
      env,
      stdio: 'inherit'
    });
    
    console.log('Restore completed successfully');
  } catch (error) {
    console.error('Restore failed:', error.message);
    process.exit(1);
  }
};

// Execute restore
restoreDatabase();
