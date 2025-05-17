import { j as json } from "../../../../chunks/index2.js";
import { h as createOrUpdatePage } from "../../../../chunks/api.js";
async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { globalData } = await request.json();
  await createOrUpdatePage("global", globalData, currentUser);
  return json({ status: "ok" });
}
export {
  POST
};
