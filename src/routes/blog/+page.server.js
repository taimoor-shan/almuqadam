import { getArticles, getPage } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const articles = await getArticles(currentUser);
  const globalData = await getPage('global');

  return {
    currentUser,
    articles,
    globalData
  };
}
