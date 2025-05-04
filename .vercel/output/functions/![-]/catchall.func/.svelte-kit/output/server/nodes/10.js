import * as server from '../entries/pages/logout/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logout/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/logout/+page.server.js";
export const imports = ["_app/immutable/nodes/10.KFAMl8gT.js","_app/immutable/chunks/FYrJzXzo.js","_app/immutable/chunks/BWQv4ORO.js","_app/immutable/chunks/CM28Q3F9.js","_app/immutable/chunks/Agn4hVUl.js","_app/immutable/chunks/DiyuqIyz.js","_app/immutable/chunks/aOCAfh_U.js","_app/immutable/chunks/ByemxZE2.js","_app/immutable/chunks/VQVawItz.js","_app/immutable/chunks/KVacng_F.js"];
export const stylesheets = [];
export const fonts = [];
