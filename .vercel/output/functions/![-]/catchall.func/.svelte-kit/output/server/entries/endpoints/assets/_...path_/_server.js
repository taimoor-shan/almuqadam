import { g as getAsset } from "../../../../chunks/api.js";
import { e as error } from "../../../../chunks/index2.js";
const GET = async ({ params, setHeaders }) => {
  const path = params.path;
  const file = getAsset(path);
  if (!file || !file.data) {
    throw error(404, "Asset not found");
  }
  setHeaders({
    "Content-Type": file.mimeType,
    "Content-Length": file.size.toString(),
    "Last-Modified": new Date(file.lastModified).toUTCString(),
    "Cache-Control": "public, max-age=600"
  });
  return new Response(file.data);
};
export {
  GET
};
