import { z as push, G as fallback, P as attr, O as attr_class, Q as clsx, D as slot, N as bind_props, C as pop } from "./index.js";
import { c as classNames } from "./util.js";
function BaseButton($$payload, $$props) {
  push();
  let className;
  let styles = $$props["styles"];
  let size = fallback($$props["size"], "default");
  let type = fallback($$props["type"], "button");
  let href = fallback($$props["href"], void 0);
  let disabled = fallback($$props["disabled"], false);
  const STYLE_SHARED = "m-0 p-0 disabled:cursor-not-allowed disabled:opacity-50 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 font-sans no-underline text-center";
  const STYLE_SIZES = {
    sm: `px-4 py-2 text-sm sm:text-base sm:px-4 sm:py-1`,
    default: `px-4 py-2 text-sm sm:text-base sm:px-5 sm:py-3`,
    lg: `px-8 sm:px-12 py-3 text-base sm:py-4 sm:text-xl`
  };
  className = classNames(styles, STYLE_SHARED, STYLE_SIZES[size], disabled ? "disabled" : "");
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", href)}${attr_class(clsx(className))}${attr("disabled", disabled, true)}><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${attr("type", type)}${attr_class(clsx(className))}${attr("disabled", disabled, true)}><!---->`;
    slot($$payload, $$props, "default", {});
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { styles, size, type, href, disabled });
  pop();
}
function PrimaryButton($$payload, $$props) {
  let disabled = fallback($$props["disabled"], void 0);
  let type = fallback($$props["type"], "button");
  let size = fallback($$props["size"], void 0);
  let href = fallback($$props["href"], void 0);
  BaseButton($$payload, {
    type,
    size,
    disabled,
    href,
    styles: "font-medium hover:bg-gray-800 focus:ring-gray-900 border-2 border-transparent bg-gray-900 text-white",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      slot($$payload2, $$props, "default", {});
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { disabled, type, size, href });
}
export {
  BaseButton as B,
  PrimaryButton as P
};
