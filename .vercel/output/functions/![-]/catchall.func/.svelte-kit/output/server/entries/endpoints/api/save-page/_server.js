import { j as json } from "../../../../chunks/index2.js";
import { b as createOrUpdatePage } from "../../../../chunks/api.js";
async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { pageId, page } = await request.json();
  await createOrUpdatePage(pageId, page, currentUser);
  return json({ pageId, status: "ok" });
}
export {
  POST
};
