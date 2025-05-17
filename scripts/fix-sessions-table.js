// This script specifically creates the sessions table if it doesn't exist
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get DATABASE_URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function fixSessionsTable() {
  console.log('Starting sessions table fix...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
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
      console.log('Creating sessions table...');

      // Create sessions table
      await client.query(`
        CREATE TABLE IF NOT EXISTS sessions (
          session_id TEXT PRIMARY KEY,
          expires TIMESTAMP NOT NULL
        );
      `);

      console.log('Sessions table created successfully');
    } else {
      console.log('Sessions table already exists');
    }

    // Verify all tables
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('Tables in database:');
    tables.rows.forEach(table => {
      console.log(`- ${table.table_name}`);
    });

    console.log('Fix completed successfully');
  } catch (error) {
    console.error('Error during fix:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixSessionsTable().catch(console.error);
