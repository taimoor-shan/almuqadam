#!/usr/bin/env node

/**
 * PostgreSQL Database Dump and Restore Script
 *
 * This script creates a dump of a remote PostgreSQL database and restores it to a local database.
 * It uses pg_dump to create a backup and pg_restore to restore it.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create backup directory if it doesn't exist
const backupDir = path.resolve(__dirname, '../data/pg-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Generate backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.dump`);

// Parse the DATABASE_URL to extract connection details
const parseDbUrl = (url) => {
  try {
    // Handle localhost special case
    if (url.includes('localhost')) {
      const parts = url.split('/');
      const database = parts[parts.length - 1].split('?')[0];
      return {
        user: process.env.USER || '',
        password: '',
        host: 'localhost',
        port: '5432',
        database: database,
        sslmode: 'prefer'
      };
    }

    // Handle standard postgres URL
    const regex = /postgres:\/\/([^:]+):([^@]+)@([^:]+):?(\d+)?\/([^?]+)/;
    const match = url.match(regex);

    if (!match) {
      throw new Error('Invalid DATABASE_URL format: ' + url);
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

// Main function
const main = async () => {
  try {
    // Load remote database configuration
    const remoteDbUrl = process.env.REMOTE_DATABASE_URL || 'postgres://default:s5uJkVfFM6PQ@ep-crimson-cell-10033438-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require';
    const localDbUrl = process.env.DATABASE_URL;

    if (!localDbUrl) {
      throw new Error('DATABASE_URL not found in environment');
    }

    const remoteConfig = parseDbUrl(remoteDbUrl);
    const localConfig = parseDbUrl(localDbUrl);

    console.log(`Remote database: ${remoteConfig.database} on ${remoteConfig.host}`);
    console.log(`Local database: ${localConfig.database} on ${localConfig.host}`);

    // Set environment variables for pg_dump
    const remoteEnv = {
      ...process.env,
      PGUSER: remoteConfig.user,
      PGPASSWORD: remoteConfig.password,
      PGHOST: remoteConfig.host,
      PGPORT: remoteConfig.port,
      PGDATABASE: remoteConfig.database
    };

    // Set environment variables for pg_restore
    const localEnv = {
      ...process.env,
      PGUSER: localConfig.user,
      PGPASSWORD: localConfig.password,
      PGHOST: localConfig.host,
      PGPORT: localConfig.port,
      PGDATABASE: localConfig.database
    };

    // Step 1: Create a custom format dump
    console.log('Creating database dump...');
    const pgDumpCmd = `pg_dump -Fc -v -f "${backupFile}"`;
    console.log(`Executing: ${pgDumpCmd}`);

    execSync(pgDumpCmd, {
      env: remoteEnv,
      stdio: 'inherit'
    });

    console.log(`Dump created: ${backupFile}`);

    // Step 2: Restore the dump to the local database
    console.log('Restoring to local database...');
    const pgRestoreCmd = `pg_restore -v -c -d ${localConfig.database} "${backupFile}"`;
    console.log(`Executing: ${pgRestoreCmd}`);

    execSync(pgRestoreCmd, {
      env: localEnv,
      stdio: 'inherit'
    });

    console.log('Database migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
};

// Execute main function
main();
