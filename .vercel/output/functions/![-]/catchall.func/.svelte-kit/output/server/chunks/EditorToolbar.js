import { V as current_component, z as push, G as fallback, O as store_get, I as copy_payload, J as assign_payload, P as unsubscribe_stores, K as bind_props, C as pop, M as attr_class, N as clsx, D as slot, R as ensure_array_like, T as attr, F as escape_html, E as getContext, U as await_block } from "./index.js";
import { c as classNames } from "./util.js";
import { S as SHORTCUTS } from "./constants.js";
import "./client.js";
import { w as writable } from "./exports.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const activeEditorView = writable(null);
const isEditing = writable(false);
const currentUser = writable(null);
function PlainText($$payload, $$props) {
  push();
  var $$store_subs;
  let content = $$props["content"];
  let multiLine = fallback($$props["multiLine"], false);
  let editor = null;
  let editorLoaded = false;
  let contentContainer;
  function loadEditor() {
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing) && !editorLoaded) {
      import("./PlainTextEditor.js").then((module) => {
        editor = module.default;
        editorLoaded = true;
      }).catch((err) => {
        console.error("Failed to load PlainTextEditor:", err);
      });
    } else if (!store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      editor = null;
      editorLoaded = false;
    }
  }
  {
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      loadEditor();
    } else {
      editor = null;
    }
  }
  if (content && contentContainer && !store_get($$store_subs ??= {}, "$isEditing", isEditing)) ;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      if (editor) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        editor?.($$payload2, {
          multiLine,
          get content() {
            return content;
          },
          set content($$value) {
            content = $$value;
            $$settled = false;
          }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<span></span>`;
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span></span>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { content, multiLine });
  pop();
}
function NotEditable($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div${attr_class(clsx(classNames(store_get($$store_subs ??= {}, "$isEditing", isEditing) ? "opacity-25 cursor-not-allowed relative" : "")))}>`;
  if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute inset-0 z-50"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Footer($$payload, $$props) {
  push();
  let counter = $$props["counter"];
  NotEditable($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<footer class="footer"><div class="w-layout-blockcontainer container w-container"><div class="w-layout-grid grid-footer"><div id="w-node-_7c3bf295-6060-045d-7271-bf484b242481-ecf59ae5" class="footer-logo-item"><a href="index.html" class="footer-logo-wrap w-inline-block"><img loading="eager" src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778b7076f30c5e95cc58e46_visahub-white.svg" alt="Visahub white logo" class="footer-logo"></a> <div class="no-margin w-form"><form id="wf-form-Footer-Subscribe-Form" name="wf-form-Footer-Subscribe-Form" data-name="Footer Subscribe Form" method="get" data-wf-page-id="677b87814b270850a98a51f3" data-wf-element-id="af04f538-b775-d2ff-f300-5926dedb5e3a"><h2 class="footer-subscribe-title">Subscribe to our newsletter</h2> <div class="footer-form"><input class="form-input form-input-footer w-input" maxlength="256" name="Footer-Email" data-name="Footer Email" placeholder="Enter your email address" type="email" id="Footer-Email" required=""><input type="submit" data-wait="" aria-label="button" class="footer-form-button w-button" value=""></div></form> <div class="success-message w-form-done"><div>Thank you! Your submission has been received!</div></div> <div class="error-message w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div> <div class="grid-footer-link"><div class="footer-link-item-wrap"><h2 class="footer-item-title">Pages</h2> <div class="grid-footer-link-wrap"><div class="grid-footer-link-inner"><a href="index.html" class="footer-simple-link">Home</a><a href="home-2.html" class="footer-simple-link">Home 2</a><a href="immigration.html" class="footer-simple-link">Immigration</a><a href="visas.html" class="footer-simple-link">Visas</a><a href="countries.html" class="footer-simple-link">Countries</a><a href="case-studies.html" class="footer-simple-link">Case Studies</a></div> <div class="grid-footer-link-inner"><a href="testimonials.html" class="footer-simple-link">Testimonials</a><a href="agents.html" class="footer-simple-link">Agents</a><a href="about.html" aria-current="page" class="footer-simple-link w--current">About</a><a href="blog.html" class="footer-simple-link">Blog</a><a href="contact.html" class="footer-simple-link">Contact</a><a href="privacy-policy.html" class="footer-simple-link">Privacy Policy</a></div></div></div> <div class="footer-link-item-wrap"><h2 class="footer-item-title">Utility</h2> <div class="grid-footer-link-wrap"><div class="grid-footer-link-inner"><a href="utility-pages/style-guide.html" class="footer-simple-link">Style Guide</a><a href="utility-pages/instructions.html" class="footer-simple-link">Instructions</a><a href="utility-pages/licenses.html" class="footer-simple-link">Licenses</a><a href="utility-pages/changelog.html" class="footer-simple-link">Changelog</a><a href="utility-pages/coming-soon.html" class="footer-simple-link">Coming Soon</a></div> <div class="grid-footer-link-inner"><a href="utility-pages/link-in-bio.html" class="footer-simple-link">Link in Bio</a><a href="401.html" class="footer-simple-link">Password Protected</a><a href="404.html" class="footer-simple-link">Error 404</a></div></div></div></div></div> <div class="w-layout-grid grid-footer-contact"><div id="w-node-_07b30d10-699d-b2dc-c1b2-f6cde3af0c94-ecf59ae5" class="footer-link-item-wrap"><h2 class="footer-item-title">Contact on</h2> <div class="contact-wrap"><a href="tel:(91)125879786" class="contact-link">(91) 125 879 786</a><a href="tel:(+85)578666333" class="contact-link">(+85) 578 666 333</a><a href="mailto:example@gmail.com" class="contact-link">example@gmail.com</a></div></div> <div id="w-node-d70db279-fe22-48cf-776b-954ca665c3ed-ecf59ae5" class="footer-link-item-wrap"><h2 class="footer-item-title">Office location</h2> <div class="footer-address-wrap"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778c8c269cc7a0553111f1e_icon-02.svg" loading="eager" alt="Icon 02" class="footer-address-icon"> <div class="footer-address-list"><div><span class="text-white">Las Vegas</span> - 4th Floor, Plot No.22,145 Murphy Canyon Rd.</div> <div>Mon-Sat: <span class="text-white">9 AM – 6 PM</span></div> <div>Sunday: <span class="text-white">Closed</span></div></div></div></div></div> <div class="footer-bottom"><p class="footer-copyright">Designed by <a href="https://webestica.com/" target="_blank" class="copyright-link">Webestica</a>, Powered by <a href="https://webflow.com/" target="_blank" class="copyright-link">Webflow</a></p> <div class="social-list"><a href="https://www.facebook.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f0d350d174adda102_facebook.svg" loading="eager" alt="Facebook icon" class="social-icon"></a><a href="https://instagram.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f3f581fa54c9b7302_instagram.svg" loading="eager" alt="Instagram icon" class="social-icon"></a><a href="https://x.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6ff49358dd4d032d5a_x.svg" loading="eager" alt="X icon" class="social-icon"></a><a href="https://www.linkedin.com/" target="_blank" class="social-link w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ca6f69cc7a055311c6a2_linkedin.svg" loading="eager" alt="Linkedin icon" class="social-icon"></a></div></div></div></footer> <span class="more-templates w-inline-block"><div><a href="https://wa.me/1234567890" target="_blank" class="whatsapp-button w-inline-block"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg" alt="WhatsApp" width="22" height="22"> <span class="ms-2">Chat on WhatsApp</span></a></div></span>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { counter });
  pop();
}
function Modal($$payload, $$props) {
  push();
  let position = fallback($$props["position"], "bottom");
  onDestroy(() => {
  });
  $$payload.out += `<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> <div class="fixed inset-0 z-50 overflow-y-auto"><div${attr_class(clsx(classNames("flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0", position === "bottom" ? "items-end" : "items-start")))}><div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-full sm:max-w-lg"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div></div></div></div>`;
  bind_props($$props, { position });
  pop();
}
function Search($$payload, $$props) {
  push();
  let showSearch = $$props["showSearch"];
  let value;
  let result = SHORTCUTS;
  let selectedResult = 0;
  const each_array = ensure_array_like(result);
  $$payload.out += `<div class="relative border-b border-gray-100 flex space-x-4 items-center px-4 sm:px-6 py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg> <input${attr("value", value)} autocomplete="off" id="search" name="search" class="block w-full border-none bg-transparent px-0 py-2 placeholder-gray-300 focus:border-black focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0" placeholder="Search website ..." type="text"> <button class="bg-gray-100 rounded-md px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900">ESC</button></div> `;
  if (result.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="font-bold text-sm px-4 sm:px-6 py-4 border-b border-gray-100">${escape_html("SHORTCUTS")}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="overflow-y-auto"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let item = each_array[i];
    $$payload.out += `<a${attr_class(clsx(classNames("block px-4 sm:px-6 py-3 border-b border-gray-100 text-gray-600 hover:text-black", selectedResult === i ? "bg-gray-100" : "")))}${attr("href", item.url)}>${escape_html(item.name)}</a>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { showSearch });
  pop();
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function WebsiteNav($$payload, $$props) {
  push();
  var $$store_subs;
  let showUserMenu = fallback($$props["showUserMenu"], void 0);
  let showSearch = fallback($$props["showSearch"], void 0);
  function isActive(path) {
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname === path) return true;
    if (path !== "/" && store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(path)) return true;
    return false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (showSearch) {
      $$payload2.out += "<!--[-->";
      Modal($$payload2, {
        position: "top",
        children: ($$payload3) => {
          Search($$payload3, {
            get showSearch() {
              return showSearch;
            },
            set showSearch($$value) {
              showSearch = $$value;
              $$settled = false;
            }
          });
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">`;
    NotEditable($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<div class="w-layout-blockcontainer container w-container"><div class="flex items-center relative justify-between"><a href="/" class="brand-wrap w-nav-brand"><img loading="eager" src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778b72212f759419cce452a_visahub.svg" alt="Visahub logo" class="brand"></a> <nav class="nav-menu w-nav-menu"><a href="/"${attr_class(clsx(classNames("nav-link w-nav-link", isActive("/") ? "w--current" : "")))}>Home</a> <a href="/about"${attr_class(clsx(classNames("nav-link w-nav-link", isActive("/about") ? "w--current" : "")))}>About</a> <a href="/immigration"${attr_class(clsx(classNames("nav-link w-nav-link", isActive("/immigration") ? "w--current" : "")))}>Immigration</a> <a href="/blog"${attr_class(clsx(classNames("nav-link w-nav-link", isActive("/blog") ? "w--current" : "")))}>Blog</a></nav> `;
        if (store_get($$store_subs ??= {}, "$currentUser", currentUser)) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<button class="ml-0 hover:text-black"${attr("title", store_get($$store_subs ??= {}, "$currentUser", currentUser).name)} aria-label="User menu"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> <div class="cta flex gap-4"><div id="w-node-_63067e08-366b-f93d-ca5a-9cb96c243ffe-2ccf17b1" class="nav-right"><a href="/contact"${attr_class(clsx(classNames("button-black nav-button w-button", isActive("/contact") ? "active-button" : "")))}>Get started</a></div> <div id="w-node-_63067e08-366b-f93d-ca5a-9cb96c244005-2ccf17b1" class="menu-button w-nav-button"><div class="menu-button-icon w-icon-nav-menu"></div></div></div></div></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { showUserMenu, showSearch });
  pop();
}
function EditorToolbar_1($$payload) {
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
    $$payload.out += "<!--[-->";
    await_block($$payload, import("./EditorControls.js"), () => {
    }, (EditorToolbar) => {
      EditorToolbar.default($$payload, {});
    });
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  EditorToolbar_1 as E,
  Footer as F,
  Modal as M,
  NotEditable as N,
  PlainText as P,
  WebsiteNav as W,
  activeEditorView as a,
  currentUser as c,
  isEditing as i,
  onDestroy as o
};
