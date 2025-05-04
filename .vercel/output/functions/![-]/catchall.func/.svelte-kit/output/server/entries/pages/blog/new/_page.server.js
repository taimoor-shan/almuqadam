import { h as getPage } from "../../../../chunks/api.js";
async function load({ locals }) {
  const currentUser = locals.user;
  const globalData = await getPage("global");
  return {
    currentUser,
    globalData
  };
}
export {
  load
};
