import { getCountryBySlug, getPage } from '$lib/api';

export async function load({ params, locals }) {
  const currentUser = locals.user;
  const data = await getCountryBySlug(params.slug);
  const globalData = await getPage('global');

  return {
    ...data,
    currentUser,
    globalData
  };
}
