import "clsx";
import { z as push, T as attr, M as attr_class, N as clsx, D as slot, K as bind_props, C as pop, F as escape_html } from "./index.js";
import { a as activeEditorView, o as onDestroy } from "./EditorToolbar.js";
import { toggleMark, wrapIn, setBlockType } from "prosemirror-commands";
import { m as markActive, b as blockTypeActive, a as markApplies, c as canInsert } from "./prosemirrorUtil.js";
import { c as classNames } from "./util.js";
import { wrapInList } from "prosemirror-schema-list";
import { P as PrimaryButton } from "./PrimaryButton.js";
import { S as SecondaryButton } from "./SecondaryButton.js";
function ToggleMark($$payload, $$props) {
  push();
  let schema, markType, command, disabled, active;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  let type = $$props["type"];
  schema = editorState.schema;
  markType = schema.marks[type];
  command = toggleMark(markType);
  disabled = !markType || !command(editorState, null);
  active = markActive(markType)(editorState);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames(active ? "bg-gray-900 text-white" : "hover:bg-gray-100", "sm:mx-1 rounded-full p-2 disabled:opacity-30")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState, type });
  pop();
}
function ToggleBulletList($$payload, $$props) {
  push();
  let schema, disabled;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  schema = editorState.schema;
  disabled = !wrapInList(schema.nodes.bullet_list)(editorView.state);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames("disabled:opacity-30 rounded-full p-2 sm:mx-1 hover:bg-gray-100")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function ToggleBlockquote($$payload, $$props) {
  push();
  let schema, disabled;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  schema = editorState.schema;
  disabled = !wrapIn(schema.nodes.blockquote)(editorView.state);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames("disabled:opacity-30 rounded-full sm:mx-1 p-2 hover:bg-gray-100")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function ToggleOrderedList($$payload, $$props) {
  push();
  let schema, disabled;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  schema = editorState.schema;
  disabled = !wrapInList(schema.nodes.ordered_list)(editorView.state);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames("disabled:opacity-30 rounded-full p-2 sm:mx-1 hover:bg-gray-100")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function ToggleHeading($$payload, $$props) {
  push();
  let schema, disabled, active;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  schema = editorState.schema;
  disabled = !setBlockType(schema.nodes.heading)(editorState) && !setBlockType(schema.nodes.paragraph)(editorState);
  active = blockTypeActive(schema.nodes.heading, { level: 1 })(editorState);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames(active ? "bg-gray-900 text-white" : "hover:bg-gray-100", "sm:mx-1 rounded-full p-2 disabled:opacity-30")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function createLink(state) {
  const schema = state.schema;
  const markType = schema.marks.link;
  if (!markType) return false;
  const { $cursor, ranges, from, to } = state.selection;
  const allowed = markApplies(state.doc, ranges, markType);
  const hasLink = state.doc.rangeHasMark(from, to, markType);
  if ($cursor || !allowed || hasLink) return false;
  return true;
}
function insertImage(state) {
  const nodeType = state.schema.nodes.image;
  if (!nodeType) return false;
  if (!canInsert(state, nodeType)) return false;
  return true;
}
function InsertImage($$payload, $$props) {
  push();
  let disabled;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  editorState.schema;
  disabled = !insertImage(editorState);
  $$payload.out += `<input class="w-px h-px opacity-0 fixed -top-40" type="file" accept="image/*" name="imagefile" multiple> <button${attr("disabled", disabled, true)}${attr_class(clsx(classNames("hover:bg-gray-100 sm:mx-1 rounded-full p-2 disabled:opacity-30")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----> ${escape_html("")}</button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function CreateLink($$payload, $$props) {
  push();
  let disabled;
  let editorView = $$props["editorView"];
  let editorState = $$props["editorState"];
  editorState.schema;
  disabled = !createLink(editorState);
  $$payload.out += `<button${attr("disabled", disabled, true)}${attr_class(clsx(classNames("disabled:opacity-30 rounded-full p-2 sm:mx-1 hover:bg-gray-100")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { editorView, editorState });
  pop();
}
function EditorControls($$payload, $$props) {
  push();
  let editorView = null;
  let editorState = null;
  const unsubscribe = activeEditorView.subscribe((value) => {
    editorView = value;
    editorState = value?.state;
  });
  onDestroy(unsubscribe);
  $$payload.out += `<div class="sticky top-0 z-10 sm:py-4 sm:px-4"><div class="max-w-screen-lg mx-auto px-2 backdrop-blur-sm bg-white bg-opacity-95 border-b border-t sm:border sm:rounded-full border-gray-100 shadow"><div><div class="flex items-center overflow-x-auto py-3 px-1">`;
  if (editorState) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex">`;
    ToggleMark($$payload, {
      editorState,
      editorView,
      type: "strong",
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" viewBox="0 0 384 512"><path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    ToggleMark($$payload, {
      editorState,
      editorView,
      type: "em",
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    CreateLink($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M562.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L405.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C189.5 251.2 196 330 246 380c56.5 56.5 148 56.5 204.5 0L562.8 267.7zM43.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C57 372 57 321 88.5 289.5L200.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C416.5 260.8 410 182 360 132c-56.5-56.5-148-56.5-204.5 0L43.2 244.3z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <div class="hidden sm:block w-px bg-gray-300 mx-3"></div> `;
    ToggleHeading($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    ToggleBlockquote($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <div class="hidden sm:block w-px bg-gray-300 mx-3"></div> `;
    ToggleBulletList($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    ToggleOrderedList($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <div class="hidden sm:block w-px bg-gray-300 mx-3"></div> `;
    InsertImage($$payload, {
      editorState,
      editorView,
      children: ($$payload2) => {
        $$payload2.out += `<svg class="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex-1 h-8"></div> `;
  SecondaryButton($$payload, {
    type: "button",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Cancel`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="shrink-0 w-2 sm:w-4"></div> `;
  PrimaryButton($$payload, {
    type: "button",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Save`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div></div>`;
  pop();
}
export {
  EditorControls as default
};
