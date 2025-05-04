import { DOMParser } from "prosemirror-model";
function fromHTML(schema, content) {
  const doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = content;
  return DOMParser.fromSchema(schema).parse(doc.body);
}
function markActive(type) {
  return function(state) {
    const { from, $from, to, empty } = state.selection;
    if (!type) return false;
    if (empty) return type.isInSet(state.storedMarks || $from.marks());
    else return state.doc.rangeHasMark(from, to, type);
  };
}
function canInsert(state, nodeType) {
  const $from = state.selection.$from;
  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
  }
  return false;
}
function markApplies(doc, ranges, type) {
  for (let i = 0; i < ranges.length; i++) {
    const { $from, $to } = ranges[i];
    let can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (can) return false;
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) return true;
  }
  return false;
}
function blockTypeActive(type, attrs) {
  return function(state) {
    const dynAttrs = Object.assign({}, attrs);
    const { $from, to, node } = state.selection;
    if (node) {
      if (node.attrs.id) {
        dynAttrs.id = node.attrs.id;
      }
      return node.hasMarkup(type, dynAttrs);
    }
    if ($from.parent && $from.parent.attrs.id) {
      dynAttrs.id = $from.parent.attrs.id;
    }
    const result = to <= $from.end() && $from.parent.hasMarkup(type, dynAttrs);
    return result;
  };
}
export {
  markApplies as a,
  blockTypeActive as b,
  canInsert as c,
  fromHTML as f,
  markActive as m
};
