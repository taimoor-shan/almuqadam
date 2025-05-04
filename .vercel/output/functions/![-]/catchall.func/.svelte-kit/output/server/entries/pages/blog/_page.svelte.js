import { Q as store_set, I as copy_payload, J as assign_payload, K as bind_props, C as pop, z as push, R as ensure_array_like, S as head } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
import { L as LoginMenu } from "../../../chunks/LoginMenu.js";
import { A as ArticleTeaser } from "../../../chunks/ArticleTeaser.js";
import { c as currentUser, F as Footer } from "../../../chunks/EditorToolbar.js";
import { E as EditableWebsiteTeaser } from "../../../chunks/EditableWebsiteTeaser.js";
import { W as WebsiteHeader } from "../../../chunks/WebsiteHeader.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let showUserMenu;
  let cta;
  {
    store_set(currentUser, data.currentUser);
    cta = data.globalData?.cta;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(data.articles);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Blog</title>`;
      $$payload3.out += `<meta name="description" content="What you always wanted to know about web development.">`;
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
        $$payload3.out += `<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">`;
        PrimaryButton($$payload3, {
          type: "button",
          children: ($$payload4) => {
            $$payload4.out += `<!---->New blog post`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        LoginMenu($$payload3);
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="pb-8"><div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24"><div class="font-bold text-sm">LATEST ARTICLES</div> `;
    if (data.articles.length === 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="md:text-xl py-4">No blog posts have been published so far.</div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let article = each_array[i];
      ArticleTeaser($$payload2, { article, firstEntry: i === 0 });
    }
    $$payload2.out += `<!--]--></div> `;
    EditableWebsiteTeaser($$payload2, {
      get cta() {
        return cta;
      },
      set cta($$value) {
        cta = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Footer($$payload2, { counter: "/blog" });
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
