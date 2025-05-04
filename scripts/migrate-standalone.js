// This script initializes the PostgreSQL database with the schema
// It can be run manually with: node scripts/migrate-standalone.js

import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
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

async function migrate() {
  console.log('Starting PostgreSQL migration...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false } // Enable SSL with self-signed certificates for production
      : DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false } // Disable SSL for localhost, enable for other environments
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Check if sessions table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'sessions'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('Creating database tables...');

      // Create tables
      await client.query(`
        CREATE TABLE IF NOT EXISTS sessions (
          session_id TEXT PRIMARY KEY,
          expires TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS pages (
          page_id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS counters (
          counter_id TEXT PRIMARY KEY,
          count INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS assets (
          asset_id TEXT PRIMARY KEY,
          mime_type TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT NULL,
          size INTEGER NOT NULL,
          data BYTEA NOT NULL
        );

        CREATE TABLE IF NOT EXISTS articles (
          article_id SERIAL PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          teaser TEXT NOT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          published_at TIMESTAMP,
          updated_at TIMESTAMP
        );
      `);

      console.log('Database tables created successfully');
    } else {
      console.log('Database tables already exist');
    }

    // Verify tables were created
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('Tables in database:');
    tables.rows.forEach(table => {
      console.log(`- ${table.table_name}`);
    });

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate().catch(console.error);
