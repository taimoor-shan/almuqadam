import { J as copy_payload, K as assign_payload, N as bind_props, C as pop, z as push, T as store_set, U as head } from "../../../chunks/index.js";
import "../../../chunks/util.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
import { L as LoginMenu } from "../../../chunks/LoginMenu.js";
import { c as currentUser, i as isEditing, F as Footer } from "../../../chunks/WebsiteNav.js";
import { E as EditableWebsiteTeaser } from "../../../chunks/EditableWebsiteTeaser.js";
import { W as WebsiteHeader } from "../../../chunks/WebsiteHeader.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let showUserMenu = false;
  let globalData;
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    globalData = data.globalData || { cta: void 0 };
    store_set(isEditing, false);
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Global Settings</title>`;
      $$payload3.out += `<meta name="description" content="Edit global website settings">`;
    });
    WebsiteHeader($$payload2, {
      get showUserMenu() {
        return showUserMenu;
      },
      set showUserMenu($$value) {
        showUserMenu = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        PrimaryButton($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Edit global settings`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        LoginMenu($$payload3);
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="py-12 sm:py-24"><div class="max-w-screen-xl mx-auto px-6"><h1 class="text-4xl md:text-5xl font-bold pb-8">Global Settings</h1> <p class="text-xl mb-8">Edit components that appear across multiple pages.</p> <div class="mb-12"><h2 class="text-2xl font-bold mb-4">Call to Action Section</h2> <p class="mb-4">This section appears at the bottom of blog posts and other pages.</p> `;
    EditableWebsiteTeaser($$payload2, {
      get cta() {
        return globalData.cta;
      },
      set cta($$value) {
        globalData.cta = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div> `;
    Footer($$payload2, { counter: "/global-settings" });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
