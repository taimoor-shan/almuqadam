import { getCountries, getPage } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const countries = await getCountries(currentUser);
  const globalData = await getPage('global');

  return {
    currentUser,
    countries,
    globalData
  };
}
