import { G as fallback, O as attr_class, Q as clsx, D as slot, N as bind_props, C as pop, z as push } from "./index.js";
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
