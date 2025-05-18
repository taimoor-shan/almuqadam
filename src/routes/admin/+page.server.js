import { getPage } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const globalData = await getPage('global');
  
  return {
    currentUser,
    globalData
  };
}
