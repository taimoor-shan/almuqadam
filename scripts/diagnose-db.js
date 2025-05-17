// This script diagnoses database connection and schema issues
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

async function diagnoseDatabase() {
  console.log('Starting database diagnosis...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Get database name
    const dbResult = await client.query('SELECT current_database()');
    console.log(`Current database: ${dbResult.rows[0].current_database}`);

    // Get current schema search path
    const schemaResult = await client.query('SHOW search_path');
    console.log(`Current schema search path: ${schemaResult.rows[0].search_path}`);

    // List all schemas
    const schemasResult = await client.query(`
      SELECT schema_name
      FROM information_schema.schemata
      ORDER BY schema_name
    `);
    console.log('Available schemas:');
    schemasResult.rows.forEach(schema => {
      console.log(`- ${schema.schema_name}`);
    });

    // Check for sessions table in all schemas
    console.log('\nChecking for sessions table in all schemas:');
    for (const schema of schemasResult.rows) {
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = $1
          AND table_name = 'sessions'
        );
      `, [schema.schema_name]);
      
      console.log(`- Schema "${schema.schema_name}": sessions table ${tableCheck.rows[0].exists ? 'exists' : 'does not exist'}`);
    }

    // List all tables in public schema with exact case
    console.log('\nTables in public schema (with exact case):');
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    tablesResult.rows.forEach(table => {
      console.log(`- "${table.table_name}"`);
    });

    // Try to select from sessions table
    try {
      console.log('\nTrying to select from sessions table:');
      const sessionsResult = await client.query('SELECT COUNT(*) FROM sessions');
      console.log(`Sessions count: ${sessionsResult.rows[0].count}`);
    } catch (error) {
      console.error(`Error selecting from sessions table: ${error.message}`);
    }

    console.log('\nDiagnosis completed');
  } catch (error) {
    console.error('Error during diagnosis:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

diagnoseDatabase().catch(console.error);
