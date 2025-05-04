import * as server from '../entries/pages/imprint/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/imprint/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/imprint/+page.server.js";
export const imports = ["_app/immutable/nodes/8.CejSOs_k.js","_app/immutable/chunks/FYrJzXzo.js","_app/immutable/chunks/BWQv4ORO.js","_app/immutable/chunks/CM28Q3F9.js","_app/immutable/chunks/DGJXvoP4.js","_app/immutable/chunks/aOCAfh_U.js","_app/immutable/chunks/Agn4hVUl.js","_app/immutable/chunks/DiyuqIyz.js","_app/immutable/chunks/eV_I911L.js","_app/immutable/chunks/DObltuvB.js","_app/immutable/chunks/BQZnyJ-a.js","_app/immutable/chunks/Dnl6xlxb.js","_app/immutable/chunks/KVacng_F.js","_app/immutable/chunks/DbZDx95u.js","_app/immutable/chunks/VQVawItz.js","_app/immutable/chunks/Dss2Gfxm.js","_app/immutable/chunks/Cjz5tElU.js","_app/immutable/chunks/DuXeeMN9.js","_app/immutable/chunks/eamTvpPT.js","_app/immutable/chunks/yJT2sZ9i.js"];
export const stylesheets = ["_app/immutable/assets/PlainTextEditor.BmnPiOnj.css"];
export const fonts = [];
