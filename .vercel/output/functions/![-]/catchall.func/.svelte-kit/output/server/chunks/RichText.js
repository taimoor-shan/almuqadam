import { z as push, G as fallback, O as store_get, I as copy_payload, J as assign_payload, P as unsubscribe_stores, K as bind_props, C as pop } from "./index.js";
import { i as isEditing } from "./EditorToolbar.js";
function RichText($$payload, $$props) {
  push();
  var $$store_subs;
  let content = $$props["content"];
  let multiLine = fallback($$props["multiLine"], false);
  let editor = null;
  let editorLoaded = false;
  let contentContainer;
  function loadEditor() {
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing) && !editorLoaded) {
      import("./RichTextEditor.js").then((module) => {
        editor = module.default;
        editorLoaded = true;
      }).catch((err) => {
        console.error("Failed to load RichTextEditor:", err);
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
        $$payload2.out += `<div></div>`;
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div></div>`;
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
export {
  RichText as R
};
