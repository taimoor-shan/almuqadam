import { z as push, G as fallback, I as store_get, J as copy_payload, K as assign_payload, M as unsubscribe_stores, N as bind_props, C as pop, Y as await_block, P as attr, O as attr_class, Q as clsx } from "./index.js";
import { i as isEditing } from "./WebsiteNav.js";
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
  Image as I,
  PlainText as P
};
