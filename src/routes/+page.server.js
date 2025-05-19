import { getArticles, getPage, getCountries } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const articles = await getArticles();
  const countries = await getCountries(currentUser);
  const page = await getPage('home');

  return {
    currentUser,
    articles: articles.slice(0, 3),
    countries: countries.slice(0, 6), // Limit to 6 countries for the homepage
    page
  };
}
