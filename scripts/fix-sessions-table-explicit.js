// This script explicitly creates the sessions table in the public schema
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
  console.log('Starting sessions table fix with explicit schema...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Set search path explicitly
    await client.query('SET search_path TO public');
    console.log('Set search path to public schema');

    // Drop the sessions table if it exists but has issues
    console.log('Dropping sessions table if it exists...');
    try {
      await client.query('DROP TABLE IF EXISTS public.sessions');
      console.log('Dropped sessions table (if it existed)');
    } catch (error) {
      console.error(`Error dropping sessions table: ${error.message}`);
    }

    // Create sessions table with explicit schema
    console.log('Creating sessions table in public schema...');
    await client.query(`
      CREATE TABLE public.sessions (
        session_id TEXT PRIMARY KEY,
        expires TIMESTAMP NOT NULL
      );
    `);
    console.log('Sessions table created successfully');

    // Verify we can query the table
    try {
      const result = await client.query('SELECT COUNT(*) FROM public.sessions');
      console.log(`Sessions count: ${result.rows[0].count}`);
    } catch (error) {
      console.error(`Error querying sessions table: ${error.message}`);
    }

    console.log('Fix completed successfully');
  } catch (error) {
    console.error('Error during fix:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixSessionsTable().catch(console.error);
