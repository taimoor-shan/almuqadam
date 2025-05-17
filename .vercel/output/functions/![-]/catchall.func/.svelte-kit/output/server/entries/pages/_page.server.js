import { l as getArticles, m as getPage } from "../../chunks/api.js";
async function load({ locals }) {
  const currentUser = locals.user;
  const articles = await getArticles();
  const page = await getPage("home");
  return {
    currentUser,
    articles: articles.slice(0, 3),
    page
  };
}
export {
  load
};
