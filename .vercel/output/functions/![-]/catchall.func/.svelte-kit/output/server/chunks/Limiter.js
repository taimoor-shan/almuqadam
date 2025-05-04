import { G as fallback, M as attr_class, N as clsx, D as slot, K as bind_props, C as pop, z as push } from "./index.js";
import { c as classNames } from "./util.js";
function Limiter($$payload, $$props) {
  push();
  let noPadding = fallback($$props["noPadding"], false);
  $$payload.out += `<div${attr_class(clsx(classNames("max-w-lg mx-auto", noPadding ? "" : "px-4")))}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  bind_props($$props, { noPadding });
  pop();
}
export {
  Limiter as L
};
