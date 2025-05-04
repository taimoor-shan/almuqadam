import { j as json } from "../../../../chunks/index2.js";
import { u as updateArticle } from "../../../../chunks/api.js";
async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { slug, title, content, teaser } = await request.json();
  await updateArticle(slug, title, content, teaser, currentUser);
  return json({ slug, status: "ok" });
}
export {
  POST
};
