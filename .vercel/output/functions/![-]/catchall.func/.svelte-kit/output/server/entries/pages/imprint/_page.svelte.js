import { I as copy_payload, J as assign_payload, K as bind_props, C as pop, z as push, Q as store_set, S as head } from "../../../chunks/index.js";
import { c as currentUser, P as PlainText, F as Footer } from "../../../chunks/EditorToolbar.js";
import { R as RichText } from "../../../chunks/RichText.js";
import { L as LoginMenu } from "../../../chunks/LoginMenu.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
import "../../../chunks/util.js";
import { W as WebsiteHeader } from "../../../chunks/WebsiteHeader.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let showUserMenu = false, title, imprint;
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    title = data.page?.title || "Imprint";
    imprint = data.page?.imprint || [
      [
        "Ken Experiences GmbH",
        "Mozartstraße 56",
        "4020 Linz, Austria"
      ].join("<br/>"),
      [
        "Managing Director: DI Michael Aufreiter",
        "Register No: FN 408728x",
        "Court: Linz",
        "VAT ID: ATU68395257"
      ].join("<br/>")
    ].map((text) => `<p>${text}</p>`).join("\n");
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Imprint</title>`;
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
            $$payload4.out += `<!---->Edit page`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        LoginMenu($$payload3);
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="py-12 sm:py-24"><div class="max-w-screen-md mx-auto px-6 md:text-xl"><h1 class="text-4xl md:text-7xl font-bold pb-8">`;
    PlainText($$payload2, {
      get content() {
        return title;
      },
      set content($$value) {
        title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h1> <div class="prose md:prose-xl pb-12 sm:pb-24">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return imprint;
      },
      set content($$value) {
        imprint = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div> `;
    Footer($$payload2, { counter: "/imprint" });
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
