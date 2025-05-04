import { json } from '@sveltejs/kit';
import { query } from '$lib/db';

/**
 * This endpoint is called by Vercel Cron Jobs
 * It can be used for database maintenance, cleanup, etc.
 */
export async function GET() {
  try {
    // Clean up expired sessions
    const result = await query('DELETE FROM sessions WHERE expires < $1', [new Date().toISOString()]);
    
    return json({
      success: true,
      message: `Cron job completed successfully. Deleted ${result.rowCount} expired sessions.`
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return json({
      success: false,
      message: 'Cron job failed',
      error: error.message
    }, { status: 500 });
  }
}
