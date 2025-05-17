import { f as fail, r as redirect } from "../../../chunks/index2.js";
import { r as authenticate } from "../../../chunks/api.js";
const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const password = data.get("password");
    const sessionTimeout = 60 * 24 * 7;
    try {
      const { sessionId } = await authenticate(password, sessionTimeout);
      cookies.set("sessionid", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: sessionTimeout * 60
        // convert minutes to seconds
      });
    } catch (err) {
      console.error(err);
      return fail(400, { incorrect: true });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
