#!/usr/bin/env node

/**
 * PostgreSQL Database Migration Script (Remote to Local)
 *
 * This script migrates data from a remote PostgreSQL database to a local one.
 * It uses pg_dump to create a backup of the remote database and then
 * restores it to the local database.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

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
const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

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

// Backup remote database
const backupRemoteDatabase = () => {
  try {
    console.log('Loading remote database configuration...');

    // Load remote database configuration
    dotenv.config({ path: '.env.remote' });
    const remoteDbUrl = process.env.DATABASE_URL;

    if (!remoteDbUrl) {
      throw new Error('Remote DATABASE_URL not found in .env.remote');
    }

    console.log('Starting remote database backup...');

    const dbConfig = parseDbUrl(remoteDbUrl);
    console.log(`Backing up remote database: ${dbConfig.database} from host: ${dbConfig.host}`);

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

    console.log(`Executing: ${pgDumpCmd}`);

    // Execute pg_dump
    execSync(pgDumpCmd, {
      env,
      stdio: 'inherit'
    });

    console.log(`Backup completed successfully: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error('Remote backup failed:', error.message);
    process.exit(1);
  }
};

// Restore to local database
const restoreToLocalDatabase = (backupFile) => {
  try {
    console.log('Loading local database configuration...');

    // Load local database configuration
    dotenv.config({ path: '.env' });
    const localDbUrl = process.env.DATABASE_URL;

    if (!localDbUrl) {
      throw new Error('Local DATABASE_URL not found in .env');
    }

    console.log('Starting local database restore...');

    const dbConfig = parseDbUrl(localDbUrl);
    console.log(`Restoring to local database: ${dbConfig.database} on host: ${dbConfig.host}`);

    // Set environment variables for psql
    const env = {
      ...process.env,
      PGUSER: dbConfig.user,
      PGPASSWORD: dbConfig.password,
      PGHOST: dbConfig.host,
      PGPORT: dbConfig.port,
      PGDATABASE: dbConfig.database
    };

    // First, drop all tables in the target database to ensure a clean restore
    console.log('Cleaning target database...');

    // Create a temporary SQL file to drop all tables
    const dropTablesFile = path.join(backupDir, 'drop-tables.sql');
    fs.writeFileSync(dropTablesFile, `
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Disable triggers
    EXECUTE 'SET session_replication_role = replica';

    -- Drop all tables in the public schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Re-enable triggers
    EXECUTE 'SET session_replication_role = origin';
END $$;
    `);

    // Execute the drop tables script
    execSync(`psql -f "${dropTablesFile}"`, {
      env,
      stdio: 'inherit'
    });

    console.log('Database cleaned successfully');

    // For SQL files, use psql without ON_ERROR_STOP to continue on errors
    const restoreCmd = `psql -f "${backupFile}"`;

    console.log(`Executing: ${restoreCmd}`);

    // Execute restore command
    execSync(restoreCmd, {
      env,
      stdio: 'inherit'
    });

    console.log('Restore completed successfully');
  } catch (error) {
    console.error('Local restore failed:', error.message);
    process.exit(1);
  }
};

// Main function
const migrateRemoteToLocal = async () => {
  try {
    console.log('Starting migration from remote to local database...');

    // Backup remote database
    const backupFile = backupRemoteDatabase();

    // Restore to local database
    restoreToLocalDatabase(backupFile);

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
};

// Execute migration
migrateRemoteToLocal();
