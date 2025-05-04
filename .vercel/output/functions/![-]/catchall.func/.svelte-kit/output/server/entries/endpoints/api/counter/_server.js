import { c as createOrUpdateCounter } from "../../../../chunks/api.js";
import { j as json } from "../../../../chunks/index2.js";
async function GET({ url }) {
  const counterId = url.searchParams.get("c");
  return json(await createOrUpdateCounter(counterId));
}
export {
  GET
};
