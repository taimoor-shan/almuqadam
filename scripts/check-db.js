// This script checks if the SQLite database exists and has the required tables
// It can be run manually with: node scripts/check-db.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default DB path from environment variable or fallback
const DB_PATH = process.env.DB_PATH || './data/db.sqlite3';
console.log(`Using database path: ${DB_PATH}`);

// Check if database file exists
if (!fs.existsSync(DB_PATH)) {
  console.error(`ERROR: Database file does not exist at ${DB_PATH}`);
  process.exit(1);
}

// Create database connection
try {
  console.log('Connecting to database...');
  const db = new Database(DB_PATH, {
    verbose: console.log
  });
  
  // Check tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables in database:');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  
  // Check for required tables
  const requiredTables = ['sessions', 'pages', 'counters', 'assets', 'articles'];
  const missingTables = requiredTables.filter(
    tableName => !tables.some(t => t.name === tableName)
  );
  
  if (missingTables.length > 0) {
    console.error(`ERROR: Missing required tables: ${missingTables.join(', ')}`);
    process.exit(1);
  }
  
  console.log('Database check complete! All required tables exist.');
  db.close();
} catch (error) {
  console.error('Error checking database:', error);
  process.exit(1);
}
