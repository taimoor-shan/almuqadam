import { j as json } from "../../../../chunks/index2.js";
import { e as deleteArticle } from "../../../../chunks/api.js";
async function POST({ request, locals }) {
  const user = locals.user;
  const { slug } = await request.json();
  const result = await deleteArticle(slug, user);
  return json(result);
}
export {
  POST
};
