import { f as fail, r as redirect } from "../../../chunks/index2.js";
import { t as destroySession } from "../../../chunks/api.js";
const actions = {
  logout: async ({ cookies }) => {
    const sessionId = cookies.get("sessionid");
    try {
      if (sessionId) {
        await destroySession(sessionId);
        cookies.delete("sessionid", { path: "/" });
      }
    } catch (err) {
      console.error("Error during logout:", err);
      return fail(400, { incorrect: true });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
