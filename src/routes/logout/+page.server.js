import { fail, redirect } from '@sveltejs/kit';
import { destroySession } from '$lib/api';

export const actions = {
  logout: async ({ cookies }) => {
    const sessionId = cookies.get('sessionid');

    try {
      // Only try to destroy the session if it exists
      if (sessionId) {
        await destroySession(sessionId);
        cookies.delete('sessionid', { path: '/' });
      }
    } catch (err) {
      console.error('Error during logout:', err);
      return fail(400, { incorrect: true });
    }

    // Redirect to home page after logout (outside of try/catch)
    throw redirect(303, '/');
  }
};
