// This script checks the database schema and tables
// Run with: node scripts/check-db.js

import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get DATABASE_URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

async function checkDatabase() {
  console.log('Checking database schema and tables...');

  // Create a PostgreSQL client
  const client = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    console.log(`Connecting to PostgreSQL database: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

    // Check if tables exist
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('Tables in database:');
    tables.rows.forEach(table => {
      console.log(`- ${table.table_name}`);
    });

    // Check articles table structure
    console.log('\nChecking articles table structure:');
    const articlesColumns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'articles'
    `);

    if (articlesColumns.rows.length === 0) {
      console.error('Articles table does not exist or has no columns!');
    } else {
      console.log('Articles table columns:');
      articlesColumns.rows.forEach(column => {
        console.log(`- ${column.column_name} (${column.data_type}, ${column.is_nullable === 'YES' ? 'nullable' : 'not nullable'})`);
      });
    }

    // Check if there are any articles in the database
    const articlesCount = await client.query('SELECT COUNT(*) FROM articles');
    console.log(`\nNumber of articles in database: ${articlesCount.rows[0].count}`);

    if (parseInt(articlesCount.rows[0].count) > 0) {
      // Show sample article
      const sampleArticle = await client.query('SELECT * FROM articles LIMIT 1');
      console.log('\nSample article:');
      console.log(sampleArticle.rows[0]);
    }

    // Check sessions table
    const sessionsCount = await client.query('SELECT COUNT(*) FROM sessions');
    console.log(`\nNumber of sessions in database: ${sessionsCount.rows[0].count}`);

  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await client.end();
  }
}

checkDatabase().catch(console.error);
