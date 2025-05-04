import { m as getCurrentUser } from "./api.js";
async function handle({ event, resolve }) {
  event.locals.user = await getCurrentUser(event.cookies.get("sessionid"));
  const response = await resolve(event);
  return response;
}
export {
  handle
};
