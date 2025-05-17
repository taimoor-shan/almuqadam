#!/usr/bin/env node

/**
 * Copy Data Script
 * 
 * This script copies data from a remote PostgreSQL database to a local one.
 * It connects to both databases and copies the data table by table.
 */

import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Remote database connection string
const REMOTE_DB_URL = process.env.REMOTE_DATABASE_URL || 'postgres://default:s5uJkVfFM6PQ@ep-crimson-cell-10033438-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require';

// Local database connection string
const LOCAL_DB_URL = process.env.DATABASE_URL;

if (!LOCAL_DB_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Create remote database client
const remoteClient = new pg.Client({
  connectionString: REMOTE_DB_URL,
  ssl: REMOTE_DB_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Create local database client
const localClient = new pg.Client({
  connectionString: LOCAL_DB_URL,
  ssl: LOCAL_DB_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Tables to copy
const tables = [
  'pages',
  'articles',
  'assets',
  'counters',
  'countries',
  'sessions'
];

// Copy data from remote to local
async function copyData() {
  try {
    console.log('Connecting to databases...');
    await remoteClient.connect();
    await localClient.connect();
    
    console.log('Connected to both databases');
    
    // Process each table
    for (const table of tables) {
      try {
        console.log(`Processing table: ${table}`);
        
        // Get data from remote table
        const result = await remoteClient.query(`SELECT * FROM ${table}`);
        
        if (result.rows.length === 0) {
          console.log(`No data found in table ${table}`);
          continue;
        }
        
        console.log(`Found ${result.rows.length} rows in table ${table}`);
        
        // Clear local table
        await localClient.query(`DELETE FROM ${table}`);
        console.log(`Cleared local table ${table}`);
        
        // Insert data into local table
        for (const row of result.rows) {
          const columns = Object.keys(row);
          const values = Object.values(row);
          const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
          
          const query = `
            INSERT INTO ${table} (${columns.join(', ')})
            VALUES (${placeholders})
            ON CONFLICT DO NOTHING
          `;
          
          await localClient.query(query, values);
        }
        
        console.log(`Copied ${result.rows.length} rows to table ${table}`);
        
        // Reset sequences if needed
        if (table === 'articles') {
          await localClient.query(`
            SELECT setval('articles_article_id_seq', (SELECT MAX(article_id) FROM articles), true)
          `);
          console.log('Reset articles_article_id_seq');
        } else if (table === 'countries') {
          await localClient.query(`
            SELECT setval('countries_country_id_seq', (SELECT MAX(country_id) FROM countries), true)
          `);
          console.log('Reset countries_country_id_seq');
        }
      } catch (error) {
        console.error(`Error processing table ${table}:`, error.message);
      }
    }
    
    console.log('Data copy completed successfully');
  } catch (error) {
    console.error('Error copying data:', error.message);
    process.exit(1);
  } finally {
    // Close connections
    await remoteClient.end();
    await localClient.end();
    console.log('Database connections closed');
  }
}

// Execute copy
copyData();
