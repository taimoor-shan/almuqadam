import { j as json } from "../../../../chunks/index2.js";
import { e as storeAsset } from "../../../../chunks/api.js";
async function PUT({ request }) {
  const data = await request.formData();
  const asset_id = data.get("path");
  const file = data.get("file")?.valueOf();
  await storeAsset(asset_id, file);
  return json({ path: asset_id });
}
export {
  PUT
};
