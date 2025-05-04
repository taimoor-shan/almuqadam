// This script initializes the SQLite database with the schema
// It can be run manually with: node scripts/init-db.js

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

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  console.log(`Creating directory: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
try {
  console.log('Connecting to database...');
  const db = new Database(DB_PATH, {
    verbose: console.log
  });
  
  // Set pragmas
  db.pragma('journal_mode = WAL');
  db.pragma('case_sensitive_like = true');
  
  // Read schema file
  const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  console.log(`Reading schema from: ${schemaPath}`);
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  // Execute schema
  console.log('Executing schema...');
  db.exec(schema);
  
  // Verify tables were created
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables created:');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  
  console.log('Database initialization complete!');
  db.close();
} catch (error) {
  console.error('Error initializing database:', error);
  process.exit(1);
}
