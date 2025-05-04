import { getArticleBySlug, getNextArticle, getPage } from '$lib/api';

export async function load({ params, locals }) {
  const currentUser = locals.user;
  const data = await getArticleBySlug(params.slug);
  const nextArticle = await getNextArticle(params.slug);
  const articles = nextArticle ? [nextArticle] : [];
  const globalData = await getPage('global');

  return {
    ...data,
    currentUser,
    articles,
    globalData
  };
}
