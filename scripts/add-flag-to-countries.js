import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Add flag column to countries table if it doesn't exist
    await client.query(`
      ALTER TABLE countries
      ADD COLUMN IF NOT EXISTS flag TEXT;
    `);
    console.log('Flag column added to countries table');

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
    console.log('Disconnected from database');
  }
}

migrate();
