// This script initializes the global settings page
// Run with: node scripts/init-global-settings.js

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

async function initGlobalSettings() {
  console.log('Initializing global settings...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false } // Enable SSL with self-signed certificates for production
      : DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false } // Disable SSL for localhost, enable for other environments
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Check if global settings exist
    const globalCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM pages
        WHERE page_id = 'global'
      );
    `);

    if (!globalCheck.rows[0].exists) {
      console.log('Creating global settings...');

      // Create default global settings
      const defaultGlobalSettings = {
        cta: {
          title: "Ready to get started?",
          subtitle: "Contact us today to learn more about our services.",
          buttonText: "Contact Us",
          buttonUrl: "/contact"
        }
      };

      // Insert global settings
      await client.query(
        'INSERT INTO pages (page_id, data, updated_at) VALUES ($1, $2, $3)',
        ['global', defaultGlobalSettings, new Date().toISOString()]
      );

      console.log('Global settings created successfully');
    } else {
      console.log('Global settings already exist');
    }

    console.log('Initialization completed successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initGlobalSettings().catch(console.error);
