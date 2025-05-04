import { f as fail, r as redirect } from "../../../chunks/index2.js";
import { l as destroySession } from "../../../chunks/api.js";
async function load({ cookies }) {
  const sessionId = cookies.get("sessionid");
  try {
    await destroySession(sessionId);
    cookies.delete("sessionid", { path: "/" });
  } catch (err) {
    console.error(err);
    return fail(400, { incorrect: true });
  }
  throw redirect(303, "/");
}
export {
  load
};
