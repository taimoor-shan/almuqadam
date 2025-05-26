import { json } from '@sveltejs/kit';

/**
 * Catch-all handler for .well-known requests
 * This prevents 404 errors for various well-known endpoints that browsers might request
 */
export async function GET({ params }) {
  const path = params.path;
  
  // Log the request for debugging purposes (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Well-known request: /.well-known/${path}`);
  }
  
  // Return an empty JSON response for most well-known requests
  // This satisfies most automated requests from browsers and tools
  return json({});
}
