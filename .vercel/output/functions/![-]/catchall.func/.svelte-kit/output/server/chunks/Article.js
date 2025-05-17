import { z as push, G as fallback, J as copy_payload, K as assign_payload, N as bind_props, C as pop, F as escape_html } from "./index.js";
import { P as PlainText } from "./EditorToolbar.js";
import { R as RichText } from "./RichText.js";
import { f as formatDate } from "./util.js";
function Article($$payload, $$props) {
  push();
  let title = $$props["title"];
  let content = $$props["content"];
  let published_at = fallback($$props["published_at"], void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div><div class="max-w-screen-md mx-auto px-6"><div class="pt-12 sm:pt-24">`;
    if (!published_at) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="font-bold text-sm">DRAFT</div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="font-bold text-sm">${escape_html(formatDate(published_at))}</div>`;
    }
    $$payload2.out += `<!--]--></div> <h1 class="text-3xl md:text-5xl font-bold pt-1">`;
    PlainText($$payload2, {
      get content() {
        return title;
      },
      set content($$value) {
        title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h1></div></div> <div class="max-w-screen-md mx-auto px-6 pb-12 sm:pb-24"><div id="article_content" class="richText">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return content;
      },
      set content($$value) {
        content = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { title, content, published_at });
  pop();
}
export {
  Article as A
};
