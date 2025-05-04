import * as server from '../entries/pages/blog/_slug_/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/5.CBhUW3n-.js","_app/immutable/chunks/FYrJzXzo.js","_app/immutable/chunks/BWQv4ORO.js","_app/immutable/chunks/CM28Q3F9.js","_app/immutable/chunks/DGJXvoP4.js","_app/immutable/chunks/Agn4hVUl.js","_app/immutable/chunks/DiyuqIyz.js","_app/immutable/chunks/Bf_GlPOz.js","_app/immutable/chunks/DObltuvB.js","_app/immutable/chunks/BQZnyJ-a.js","_app/immutable/chunks/aOCAfh_U.js","_app/immutable/chunks/Dnl6xlxb.js","_app/immutable/chunks/KVacng_F.js","_app/immutable/chunks/DbZDx95u.js","_app/immutable/chunks/VQVawItz.js","_app/immutable/chunks/Dss2Gfxm.js","_app/immutable/chunks/B7ELaPv5.js","_app/immutable/chunks/C7X9HWNR.js","_app/immutable/chunks/HouU0xVH.js","_app/immutable/chunks/CL8V5ySg.js","_app/immutable/chunks/dPMqfpEl.js","_app/immutable/chunks/C2nClWbZ.js","_app/immutable/chunks/DFrj4qsR.js"];
export const stylesheets = ["_app/immutable/assets/PlainTextEditor.BmnPiOnj.css","_app/immutable/assets/ImageEditor.DPC6ZVOc.css"];
export const fonts = [];
