import * as server from '../entries/pages/about/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/+page.server.js";
export const imports = ["_app/immutable/nodes/3.DYyElQpP.js","_app/immutable/chunks/D-2o5DAO.js","_app/immutable/chunks/DXR7Iels.js","_app/immutable/chunks/CXoI_gyT.js","_app/immutable/chunks/CQNqGQAk.js","_app/immutable/chunks/DKkmXZv5.js","_app/immutable/chunks/iAz9HHPj.js","_app/immutable/chunks/D_B-I8cx.js","_app/immutable/chunks/DBMtP-Wi.js","_app/immutable/chunks/CVgQVm7-.js","_app/immutable/chunks/Cw7-Qpuw.js","_app/immutable/chunks/ChMkgj39.js","_app/immutable/chunks/BQ92JVhc.js","_app/immutable/chunks/CtTAzslE.js","_app/immutable/chunks/CYFkzuKj.js","_app/immutable/chunks/DpiksOrQ.js","_app/immutable/chunks/CnIsTZk6.js","_app/immutable/chunks/DRKFocL-.js","_app/immutable/chunks/BYjgOXAC.js","_app/immutable/chunks/DiDRpqGr.js","_app/immutable/chunks/CU3XEWUt.js","_app/immutable/chunks/B3FwmCkS.js","_app/immutable/chunks/CpjFRDnj.js"];
export const stylesheets = ["_app/immutable/assets/WebsiteNav.BS0GvXs_.css","_app/immutable/assets/3.Cw4XPbwD.css","_app/immutable/assets/PlainTextEditor.BmnPiOnj.css","_app/immutable/assets/ImageEditor.DOUOuEKN.css"];
export const fonts = [];
