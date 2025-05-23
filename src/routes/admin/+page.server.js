import { redirect } from '@sveltejs/kit';
import { getPage } from '$lib/api';

export async function load({ locals }) {
  const user = locals.user;
  
  // Redirect to login if not authenticated
  if (!user) {
    throw redirect(302, '/login');
  }
  
  // Fetch global data for the admin page
  const globalData = await getPage('global');
  
  return {
    currentUser: user,
    globalData
  };
}
