import { j as json } from "../../../../chunks/index2.js";
import { a as createArticle } from "../../../../chunks/api.js";
async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { title, content, teaser } = await request.json();
  const { slug } = await createArticle(title, content, teaser, currentUser);
  return json({ slug });
}
export {
  POST
};
