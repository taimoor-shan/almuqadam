import * as server from '../entries/pages/blog/new/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/new/+page.server.js";
export const imports = ["_app/immutable/nodes/6.DCAbuk8F.js","_app/immutable/chunks/FYrJzXzo.js","_app/immutable/chunks/BWQv4ORO.js","_app/immutable/chunks/CM28Q3F9.js","_app/immutable/chunks/DGJXvoP4.js","_app/immutable/chunks/aOCAfh_U.js","_app/immutable/chunks/Agn4hVUl.js","_app/immutable/chunks/DiyuqIyz.js","_app/immutable/chunks/KVacng_F.js","_app/immutable/chunks/Cjz5tElU.js","_app/immutable/chunks/Dnl6xlxb.js","_app/immutable/chunks/eV_I911L.js","_app/immutable/chunks/DObltuvB.js","_app/immutable/chunks/BQZnyJ-a.js","_app/immutable/chunks/DbZDx95u.js","_app/immutable/chunks/VQVawItz.js","_app/immutable/chunks/Dss2Gfxm.js","_app/immutable/chunks/CmmBX89c.js","_app/immutable/chunks/CvkMypbX.js","_app/immutable/chunks/C-tBEKg_.js","_app/immutable/chunks/DuXeeMN9.js","_app/immutable/chunks/yJT2sZ9i.js"];
export const stylesheets = ["_app/immutable/assets/PlainTextEditor.BmnPiOnj.css","_app/immutable/assets/ImageEditor.DPC6ZVOc.css"];
export const fonts = [];
