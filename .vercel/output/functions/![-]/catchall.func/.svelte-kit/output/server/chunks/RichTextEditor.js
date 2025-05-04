import { z as push, G as fallback, K as bind_props, C as pop } from "./index.js";
import { a as activeEditorView, o as onDestroy } from "./EditorToolbar.js";
import { f as fromHTML } from "./prosemirrorUtil.js";
import { b as buildKeymap, a as multiLineRichTextSchema, c as singleLineRichTextSchema } from "./prosemirrorKeymap.js";
import { Plugin, EditorState } from "prosemirror-state";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { smartQuotes, ellipsis, emDash, inputRules, wrappingInputRule, textblockTypeInputRule } from "prosemirror-inputrules";
function blockQuoteRule(nodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}
function orderedListRule(nodeType) {
  return wrappingInputRule(
    /^(\d+)\.\s$/,
    nodeType,
    (match) => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order == +match[1]
  );
}
function bulletListRule(nodeType) {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
}
function codeBlockRule(nodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}
function headingRule(nodeType, maxLevel) {
  return textblockTypeInputRule(new RegExp("^(#{1," + maxLevel + "})\\s$"), nodeType, (match) => ({
    level: match[1].length
  }));
}
function buildInputRules(schema) {
  let rules = smartQuotes.concat(ellipsis, emDash), type;
  if (type = schema.nodes.blockquote) rules.push(blockQuoteRule(type));
  if (type = schema.nodes.ordered_list) rules.push(orderedListRule(type));
  if (type = schema.nodes.bullet_list) rules.push(bulletListRule(type));
  if (type = schema.nodes.code_block) rules.push(codeBlockRule(type));
  if (type = schema.nodes.heading) rules.push(headingRule(type, 6));
  return inputRules({ rules });
}
const runes = false;
function RichTextEditor($$payload, $$props) {
  push();
  let content = fallback($$props["content"], "<p>Enter text.</p>");
  let multiLine = fallback($$props["multiLine"], false);
  let editorState;
  function createSchema() {
    return multiLine ? multiLineRichTextSchema : singleLineRichTextSchema;
  }
  function createEditorState(schema, content2) {
    const doc = fromHTML(schema, content2);
    return EditorState.create({
      doc,
      schema,
      plugins: [
        buildInputRules(schema),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        history(),
        onUpdatePlugin
      ]
    });
  }
  function updateEditorState() {
    const schema = createSchema();
    const newEditorState = createEditorState(schema, content);
    {
      editorState = newEditorState;
    }
  }
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
  {
    const schema = createSchema();
    if (!editorState) {
      editorState = createEditorState(schema, content);
    }
  }
  {
    if (content !== void 0 && editorState) {
      updateEditorState();
    }
  }
  $$payload.out += `<div id="prosemirror-editor"></div>`;
  bind_props($$props, { content, multiLine });
  pop();
}
export {
  RichTextEditor as default,
  runes
};
