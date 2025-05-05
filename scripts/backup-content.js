import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { DATABASE_URL } from '../vercel.js';

async function backupContent() {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    
    // Create backup directory if it doesn't exist
    const backupDir = './data/backup';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`Created backup directory: ${backupDir}`);
    }
    
    // Backup pages
    const pagesResult = await client.query('SELECT * FROM pages');
    fs.writeFileSync(path.join(backupDir, 'pages.json'), JSON.stringify(pagesResult.rows, null, 2));
    console.log(`Backed up ${pagesResult.rows.length} pages`);
    
    // Backup other content tables as needed
    // ...
    
    console.log('Content backup completed successfully');
  } catch (err) {
    console.error('Backup failed:', err);
  } finally {
    await client.end();
  }
}

backupContent();
