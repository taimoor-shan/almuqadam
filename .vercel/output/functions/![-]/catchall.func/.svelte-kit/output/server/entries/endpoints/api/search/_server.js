import { s as search } from "../../../../chunks/api.js";
import { j as json } from "../../../../chunks/index2.js";
async function GET({ url, locals }) {
  const currentUser = locals.user;
  const searchQuery = url.searchParams.get("q") || "";
  return json(await search(searchQuery, currentUser));
}
export {
  GET
};
