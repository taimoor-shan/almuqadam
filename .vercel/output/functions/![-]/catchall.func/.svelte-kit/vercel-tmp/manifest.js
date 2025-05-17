export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon-144x144.png","favicon-192x192.png","favicon-256x256.png","favicon-32x32.png","favicon-384x384.png","favicon-48x48.png","favicon-512x512.png","favicon-72x72.png","favicon-96x96.png","favicon.png","images/AlMuqadamLogo.png","images/AlMuqadamLogo.svg","images/Almuqadam-new.svg","images/ch_hero.jpeg","images/contact-vector.avif","images/person-placeholder.jpg","images/teaserBg.avif","images/vector-06.html","images/vector-06.svg","index.html","manifest.webmanifest"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpeg":"image/jpeg",".avif":"image/avif",".jpg":"image/jpeg",".html":"text/html",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.DHnWv29b.js",app:"_app/immutable/entry/app.Cx9o39mj.js",imports:["_app/immutable/entry/start.DHnWv29b.js","_app/immutable/chunks/ChMkgj39.js","_app/immutable/chunks/DXR7Iels.js","_app/immutable/chunks/DBMtP-Wi.js","_app/immutable/entry/app.Cx9o39mj.js","_app/immutable/chunks/CnIsTZk6.js","_app/immutable/chunks/DXR7Iels.js","_app/immutable/chunks/CYFkzuKj.js","_app/immutable/chunks/CQNqGQAk.js","_app/immutable/chunks/D-2o5DAO.js","_app/immutable/chunks/DKkmXZv5.js","_app/immutable/chunks/CtTAzslE.js","_app/immutable/chunks/DBMtP-Wi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/assets",
				pattern: /^\/api\/assets\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/assets/_server.js'))
			},
			{
				id: "/api/counter",
				pattern: /^\/api\/counter\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/counter/_server.js'))
			},
			{
				id: "/api/create-article",
				pattern: /^\/api\/create-article\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/create-article/_server.js'))
			},
			{
				id: "/api/create-country",
				pattern: /^\/api\/create-country\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/create-country/_server.js'))
			},
			{
				id: "/api/cron",
				pattern: /^\/api\/cron\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/cron/_server.js'))
			},
			{
				id: "/api/delete-article",
				pattern: /^\/api\/delete-article\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/delete-article/_server.js'))
			},
			{
				id: "/api/delete-country",
				pattern: /^\/api\/delete-country\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/delete-country/_server.js'))
			},
			{
				id: "/api/save-global",
				pattern: /^\/api\/save-global\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/save-global/_server.js'))
			},
			{
				id: "/api/save-page",
				pattern: /^\/api\/save-page\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/save-page/_server.js'))
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/search/_server.js'))
			},
			{
				id: "/api/update-article",
				pattern: /^\/api\/update-article\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/update-article/_server.js'))
			},
			{
				id: "/api/update-country",
				pattern: /^\/api\/update-country\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/update-country/_server.js'))
			},
			{
				id: "/api/upload-asset",
				pattern: /^\/api\/upload-asset\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/upload-asset/_server.js'))
			},
			{
				id: "/assets-manager",
				pattern: /^\/assets-manager\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/assets/[...path]",
				pattern: /^\/assets(?:\/(.*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/assets/_...path_/_server.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/blog/new",
				pattern: /^\/blog\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/countries",
				pattern: /^\/countries\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/countries/new",
				pattern: /^\/countries\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/countries/[slug]",
				pattern: /^\/countries\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/global-settings",
				pattern: /^\/global-settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/visas",
				pattern: /^\/visas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
