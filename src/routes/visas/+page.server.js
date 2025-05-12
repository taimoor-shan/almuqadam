import { getPage } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const page = await getPage('visas');
  const globalData = await getPage('global');

  return {
    currentUser,
    page,
    globalData
  };
}
