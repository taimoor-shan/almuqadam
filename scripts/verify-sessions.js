// This script verifies that the sessions table can be queried
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

async function verifySessionsTable() {
  console.log('Verifying sessions table...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Try to select from sessions table
    console.log('Querying sessions table...');
    const result = await client.query('SELECT COUNT(*) FROM sessions');
    console.log(`Sessions count: ${result.rows[0].count}`);
    
    console.log('Sessions table verified successfully');
  } catch (error) {
    console.error('Error verifying sessions table:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifySessionsTable().catch(console.error);
