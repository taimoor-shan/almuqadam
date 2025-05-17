import { m as getPage } from "../../../chunks/api.js";
async function load({ locals }) {
  const currentUser = locals.user;
  const page = await getPage("about");
  const globalData = await getPage("global");
  return {
    currentUser,
    page,
    globalData
  };
}
export {
  load
};
