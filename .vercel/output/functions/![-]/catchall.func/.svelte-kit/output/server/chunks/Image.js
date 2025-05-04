import { G as fallback, I as copy_payload, J as assign_payload, P as unsubscribe_stores, K as bind_props, O as store_get, U as await_block, T as attr, M as attr_class, N as clsx } from "./index.js";
import { i as isEditing } from "./EditorToolbar.js";
function Image($$payload, $$props) {
  var $$store_subs;
  let src = $$props["src"];
  let alt = $$props["alt"];
  let uploadPrompt = fallback($$props["uploadPrompt"], void 0);
  let maxWidth = $$props["maxWidth"];
  let maxHeight = $$props["maxHeight"];
  let quality = $$props["quality"];
  let className = fallback($$props["class"], "");
  let previewSrc;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      await_block(
        $$payload2,
        import("./ImageEditor.js"),
        () => {
          $$payload2.out += `<img${attr_class(clsx(className))}${attr("src", previewSrc || src)}${attr("alt", alt)}>`;
        },
        (ImageEditor) => {
          ImageEditor.default($$payload2, {
            class: className,
            alt,
            uploadPrompt,
            maxWidth,
            maxHeight,
            quality,
            get src() {
              return src;
            },
            set src($$value) {
              src = $$value;
              $$settled = false;
            },
            get previewSrc() {
              return previewSrc;
            },
            set previewSrc($$value) {
              previewSrc = $$value;
              $$settled = false;
            }
          });
        }
      );
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<img${attr("width", maxWidth)}${attr("height", maxHeight)}${attr_class(clsx(className))}${attr("src", src)}${attr("alt", alt)}>`;
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
  bind_props($$props, {
    src,
    alt,
    uploadPrompt,
    maxWidth,
    maxHeight,
    quality,
    class: className
  });
}
export {
  Image as I
};
