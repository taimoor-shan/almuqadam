import { z as push, G as fallback, I as copy_payload, J as assign_payload, K as bind_props, C as pop, D as slot } from "./index.js";
import { E as EditorToolbar_1, W as WebsiteNav, M as Modal } from "./EditorToolbar.js";
function WebsiteHeader($$payload, $$props) {
  push();
  let showUserMenu = fallback($$props["showUserMenu"], false);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    EditorToolbar_1($$payload2);
    $$payload2.out += `<!----> `;
    WebsiteNav($$payload2, {
      get showUserMenu() {
        return showUserMenu;
      },
      set showUserMenu($$value) {
        showUserMenu = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (showUserMenu) {
      $$payload2.out += "<!--[-->";
      Modal($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<div class="w-full flex flex-col space-y-4 p-4 sm:p-6"><!---->`;
          slot($$payload3, $$props, "default", {});
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { showUserMenu });
  pop();
}
export {
  WebsiteHeader as W
};
