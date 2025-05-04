// This is a Netlify scheduled function that runs daily to clean up expired sessions
// It's configured in netlify.toml to run at 5 AM every day

import pg from 'pg';
const { Pool } = pg;

export const handler = async function(event, context) {
  // Only run if this is a scheduled event
  if (event.headers && event.headers['x-netlify-event'] !== 'schedule') {
    console.log('This function is meant to be run on a schedule');
    // Still run the cleanup for testing purposes
  }

  try {
    // Connect to the database
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    // Delete expired sessions
    const result = await pool.query('DELETE FROM sessions WHERE expires < $1', [new Date().toISOString()]);

    // Close the connection
    await pool.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Cleanup completed successfully. Deleted ${result.rowCount} expired sessions.`
      })
    };
  } catch (error) {
    console.error('Error during scheduled cleanup:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error during scheduled cleanup',
        error: error.message
      })
    };
  }
}
