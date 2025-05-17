import { z as push, O as attr_class, P as attr, F as escape_html, Q as clsx, N as bind_props, C as pop } from "./index.js";
import { c as classNames } from "./util.js";
import { S as SecondaryButton } from "./SecondaryButton.js";
function ArticleTeaser($$payload, $$props) {
  push();
  let article = $$props["article"];
  let firstEntry = $$props["firstEntry"];
  $$payload.out += `<div><div${attr_class(clsx(classNames("max-w-screen-md mx-auto px-6 md:text-xl", firstEntry ? "pt-2 pb-8 sm:pb-12" : "py-6 sm:py-10")))}><div${attr_class(clsx(classNames(article.published_at ? "" : "opacity-50")))}><div><a${attr_class(clsx(classNames("mb-12 text-2xl md:text-3xl font-bold")))}${attr("href", `/blog/${article.slug}`)}>${escape_html(article.title)}</a></div> <div class="pt-2 pb-4"><div class="line-clamp-4"><a${attr("href", `/blog/${article.slug}`)}>${escape_html(article.teaser)}</a></div></div></div> <div class="pt-2">`;
  SecondaryButton($$payload, {
    size: "sm",
    href: `/blog/${article.slug}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->Continue reading →`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div>`;
  bind_props($$props, { article, firstEntry });
  pop();
}
export {
  ArticleTeaser as A
};
