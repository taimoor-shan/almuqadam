import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { DATABASE_URL } from '../vercel.js';

async function restoreContent() {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  
  const backupDir = './data/backup';
  
  try {
    await client.connect();
    
    // Restore pages if backup exists
    const pagesPath = path.join(backupDir, 'pages.json');
    if (fs.existsSync(pagesPath)) {
      const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      
      for (const page of pages) {
        await client.query(
          'INSERT INTO pages(page_id, data, updated_at) VALUES($1, $2, $3) ON CONFLICT (page_id) DO UPDATE SET data = $2, updated_at = $3',
          [page.page_id, page.data, page.updated_at]
        );
      }
      
      console.log(`Restored ${pages.length} pages`);
    } else {
      console.log(`No pages backup found at ${pagesPath}`);
    }
    
    // Restore other content tables as needed
    // ...
    
    console.log('Content restoration completed successfully');
  } catch (err) {
    console.error('Restoration failed:', err);
  } finally {
    await client.end();
  }
}

restoreContent();
