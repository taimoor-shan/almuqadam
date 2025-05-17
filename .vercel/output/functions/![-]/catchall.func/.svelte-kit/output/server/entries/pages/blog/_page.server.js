import { l as getArticles, m as getPage } from "../../../chunks/api.js";
async function load({ locals }) {
  const currentUser = locals.user;
  const articles = await getArticles(currentUser);
  const globalData = await getPage("global");
  return {
    currentUser,
    articles,
    globalData
  };
}
export {
  load
};
