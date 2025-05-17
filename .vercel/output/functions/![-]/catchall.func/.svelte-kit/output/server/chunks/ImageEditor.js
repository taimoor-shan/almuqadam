import { z as push, G as fallback, J as copy_payload, K as assign_payload, N as bind_props, C as pop, O as attr_class, Q as clsx, V as attr_style, P as attr } from "./index.js";
import { c as classNames, i as is_safari } from "./util.js";
function ImageEditor($$payload, $$props) {
  push();
  let src = $$props["src"];
  let alt = $$props["alt"];
  let uploadPrompt = fallback($$props["uploadPrompt"], void 0);
  let maxWidth = $$props["maxWidth"];
  let maxHeight = $$props["maxHeight"];
  let quality = $$props["quality"];
  let className = fallback($$props["class"], "");
  let scale = 1;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(clsx(classNames("hidden")))} role="region" aria-label="Image cropping overlay">`;
    if (is_safari()) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-[#EF174C]">ATTENTION:</span> Use Google Chrome, Firefox, oder Microsoft Edge for optimized image quality and size.`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `Confirm with ENTER. Cancel with ESC.`;
    }
    $$payload2.out += `<!--]--></div> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div${attr_style(`aspect-ratio: ${maxWidth}/${maxHeight}; scale: ${scale}`)}${attr_class(clsx(classNames("", "relative")))} role="button" tabindex="0" aria-label="Upload or confirm image">`;
    {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<button class="w-full h-full p-0 m-0 border-0 bg-transparent" aria-label="Select image to upload"><img${attr_class(className + " cursor-pointer outline-[2px] hover:outline-dashed outline-[#EF174C] -outline-offset-[2px]")}${attr("src", src)}${attr("alt", alt)}${attr("title", uploadPrompt)}></button>`;
    }
    $$payload2.out += `<!--]--></div> <input class="w-px h-px opacity-0 fixed -top-40" type="file" accept="image/*" name="imagefile">`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    src,
    alt,
    uploadPrompt,
    maxWidth,
    maxHeight,
    quality,
    class: className
  });
  pop();
}
export {
  ImageEditor as default
};
