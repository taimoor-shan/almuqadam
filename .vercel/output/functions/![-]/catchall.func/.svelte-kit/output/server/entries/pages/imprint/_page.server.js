import { h as getPage } from "../../../chunks/api.js";
async function load({ locals }) {
  const currentUser = locals.user;
  const page = await getPage("imprint");
  return {
    currentUser,
    page
  };
}
export {
  load
};
