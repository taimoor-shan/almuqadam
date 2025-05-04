import { z as push, G as fallback, I as copy_payload, J as assign_payload, K as bind_props, C as pop, R as ensure_array_like, O as store_get, M as attr_class, T as attr, P as unsubscribe_stores } from "./index.js";
import "./util.js";
import { P as PlainText, i as isEditing } from "./EditorToolbar.js";
import { I as Image } from "./Image.js";
function EditableWebsiteTeaser($$payload, $$props) {
  push();
  var $$store_subs;
  const CTA_DEFAULT = {
    title: "Ready to start your",
    titleHighlight: "immigration",
    titleEnd: "journey?",
    buttonText: "Schedule a free call",
    buttonUrl: "contact.html",
    backgroundImage: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677922fe8c4e46abad5e3388_vector-05.avif",
    features: [
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg",
        text: "Tailored solutions"
      },
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg",
        text: "Expert team"
      },
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg",
        text: "High approval rates"
      }
    ]
  };
  let cta = fallback($$props["cta"], CTA_DEFAULT);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(cta.features);
    $$payload2.out += `<section class="cta-section section-spacing"><div class="w-layout-blockcontainer container w-container"><div data-w-id="eb5f441a-d2c2-118b-d0a4-b31977d2e8cc" class="cta-wrap gradient-1"><div class="cta-content-wrap"><h2 class="cta-title">`;
    PlainText($$payload2, {
      get content() {
        return cta.title;
      },
      set content($$value) {
        cta.title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <span class="heading-serif">`;
    PlainText($$payload2, {
      get content() {
        return cta.titleHighlight;
      },
      set content($$value) {
        cta.titleHighlight = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span> `;
    PlainText($$payload2, {
      get content() {
        return cta.titleEnd;
      },
      set content($$value) {
        cta.titleEnd = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2> <div class="cta-feature-list"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let feature = each_array[i];
      $$payload2.out += `<div class="cta-feature-list-item">`;
      Image($$payload2, {
        src: feature.icon,
        loading: "eager",
        alt: `Icon for ${feature.text}`,
        class: "cta-feature-list-icon",
        maxWidth: "24",
        maxHeight: "24"
      });
      $$payload2.out += `<!----> <div>`;
      PlainText($$payload2, {
        get content() {
          return feature.text;
        },
        set content($$value) {
          feature.text = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> `;
      if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex ml-2 space-x-1"><button class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white" title="Delete feature" aria-label="Delete feature"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? "opacity-20" : ""}`)} title="Move up" aria-label="Move feature up"${attr("disabled", i === 0, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === cta.features.length - 1 ? "opacity-20" : ""}`)} title="Move down" aria-label="Move feature down"${attr("disabled", i === cta.features.length - 1, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-2 w-full"><button class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1">Add feature</button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex items-center mb-4"><span class="mr-2 text-white">Button URL:</span> <input type="text"${attr("value", cta.buttonUrl)} class="px-2 py-1 rounded text-sm flex-grow" placeholder="Enter URL (e.g., contact.html)"></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <a${attr("href", cta.buttonUrl)} class="button-black w-button">`;
    PlainText($$payload2, {
      get content() {
        return cta.buttonText;
      },
      set content($$value) {
        cta.buttonText = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></a></div> `;
    Image($$payload2, {
      src: cta.backgroundImage,
      loading: "lazy",
      alt: "Background vector image",
      class: "vector-06",
      maxWidth: "450",
      maxHeight: "450"
    });
    $$payload2.out += `<!----></div></div></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { cta });
  pop();
}
export {
  EditableWebsiteTeaser as E
};
