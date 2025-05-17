import { T as store_set, J as copy_payload, K as assign_payload, N as bind_props, C as pop, z as push, U as head } from "../../../../chunks/index.js";
import "../../../../chunks/util.js";
import "../../../../chunks/client.js";
import { c as currentUser, i as isEditing, N as NotEditable, F as Footer } from "../../../../chunks/WebsiteNav.js";
import { E as EditableWebsiteTeaser } from "../../../../chunks/EditableWebsiteTeaser.js";
import { A as Article } from "../../../../chunks/Article.js";
import { W as WebsiteHeader } from "../../../../chunks/WebsiteHeader.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let showUserMenu = false, title = "Untitled", content = "Copy and paste your text here.", cta;
  {
    store_set(currentUser, data.currentUser);
    store_set(isEditing, true);
    cta = data.globalData?.cta;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>New blog post</title>`;
    });
    WebsiteHeader($$payload2, {
      get showUserMenu() {
        return showUserMenu;
      },
      set showUserMenu($$value) {
        showUserMenu = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
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
      }
    });
    $$payload2.out += `<!----> `;
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
    Footer($$payload2, { counter: "/blog/new" });
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
