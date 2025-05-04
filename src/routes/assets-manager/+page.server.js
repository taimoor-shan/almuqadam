import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  const user = locals.user;
  
  // Redirect to login if not authenticated
  if (!user) {
    throw redirect(302, '/login');
  }
  
  return {
    user
  };
}
