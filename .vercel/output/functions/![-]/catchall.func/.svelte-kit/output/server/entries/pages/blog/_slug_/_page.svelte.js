import { T as store_set, J as copy_payload, K as assign_payload, N as bind_props, C as pop, z as push, U as head, S as ensure_array_like, F as escape_html, P as attr } from "../../../../chunks/index.js";
import "../../../../chunks/util.js";
import { P as PrimaryButton } from "../../../../chunks/PrimaryButton.js";
import { c as currentUser, i as isEditing, W as WebsiteNav, M as Modal, N as NotEditable, F as Footer } from "../../../../chunks/WebsiteNav.js";
import { L as LoginMenu } from "../../../../chunks/LoginMenu.js";
import "../../../../chunks/client.js";
import { A as ArticleTeaser } from "../../../../chunks/ArticleTeaser.js";
import { E as EditableWebsiteTeaser } from "../../../../chunks/EditableWebsiteTeaser.js";
import { A as Article } from "../../../../chunks/Article.js";
import { E as EditorToolbar_1 } from "../../../../chunks/EditorToolbar.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let showUserMenu = false;
  let title, teaser, content, published_at;
  let cta;
  function initOrReset() {
    title = data.title;
    teaser = data.teaser;
    content = data.content;
    published_at = data.published_at;
    data.updatedAt;
    cta = data.globalData?.cta;
    store_set(isEditing, false);
  }
  {
    store_set(currentUser, data.currentUser);
    initOrReset();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(title)}</title>`;
      $$payload3.out += `<meta name="description"${attr("content", teaser)}>`;
    });
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
          $$payload3.out += `<form class="w-full block" method="POST"><div class="w-full flex flex-col space-y-4 p-4 sm:p-6">`;
          PrimaryButton($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Edit post`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          PrimaryButton($$payload3, {
            type: "button",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Delete post`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          LoginMenu($$payload3);
          $$payload3.out += `<!----></div></form>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Article($$payload2, {
      get title() {
        return title;
      },
      set title($$value) {
        title = $$value;
        $$settled = false;
      },
      get content() {
        return content;
      },
      set content($$value) {
        content = $$value;
        $$settled = false;
      },
      get published_at() {
        return published_at;
      },
      set published_at($$value) {
        published_at = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (data.articles.length > 0) {
      $$payload2.out += "<!--[-->";
      NotEditable($$payload2, {
        children: ($$payload3) => {
          const each_array = ensure_array_like(data.articles);
          $$payload3.out += `<div class="border-t-2 border-gray-100"><div class="max-w-screen-md mx-auto px-6 pt-8 sm:pt-12"><div class="font-bold text-sm">READ NEXT</div></div> <!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let article = each_array[i];
            ArticleTeaser($$payload3, { article, firstEntry: i === 0 });
          }
          $$payload3.out += `<!--]--></div>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    NotEditable($$payload2, {
      children: ($$payload3) => {
        EditableWebsiteTeaser($$payload3, {
          get cta() {
            return cta;
          },
          set cta($$value) {
            cta = $$value;
            $$settled = false;
          }
        });
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Footer($$payload2, { counter: `/blog/${data.slug}` });
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
