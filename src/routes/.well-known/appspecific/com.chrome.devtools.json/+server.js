import { json } from '@sveltejs/kit';

/**
 * Handle Chrome DevTools requests for debugging configuration
 * This prevents 404 errors when Chrome DevTools tries to access this endpoint
 */
export async function GET() {
  // Return an empty JSON response to satisfy Chrome DevTools
  // This is a standard response for this type of request
  return json({});
}
