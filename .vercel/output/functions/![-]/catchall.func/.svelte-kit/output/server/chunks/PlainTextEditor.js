import { z as push, G as fallback, N as bind_props, C as pop } from "./index.js";
import { a as activeEditorView, o as onDestroy } from "./WebsiteNav.js";
import { f as fromHTML } from "./prosemirrorUtil.js";
import { b as buildKeymap, m as multiLinePlainTextSchema, s as singleLinePlainTextSchema } from "./prosemirrorKeymap.js";
import { Plugin, EditorState } from "prosemirror-state";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
function PlainTextEditor($$payload, $$props) {
  push();
  let schema;
  let content = fallback($$props["content"], "");
  let multiLine = fallback($$props["multiLine"], false);
  const onUpdatePlugin = new Plugin({
    view() {
      return {
        update(updatedView) {
          activeEditorView.set(updatedView);
        }
      };
    }
  });
  onDestroy(() => {
  });
  schema = multiLine ? multiLinePlainTextSchema : singleLinePlainTextSchema;
  {
    const doc = fromHTML(schema, content);
    EditorState.create({
      doc,
      schema,
      plugins: [
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        history(),
        onUpdatePlugin
      ]
    });
  }
  $$payload.out += `<div id="prosemirror-editor"></div>`;
  bind_props($$props, { content, multiLine });
  pop();
}
export {
  PlainTextEditor as default
};
