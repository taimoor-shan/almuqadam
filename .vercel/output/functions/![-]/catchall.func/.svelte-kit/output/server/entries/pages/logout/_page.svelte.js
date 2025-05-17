import { N as bind_props, C as pop, z as push } from "../../../chunks/index.js";
import { L as Limiter } from "../../../chunks/Limiter.js";
function _page($$payload, $$props) {
  push();
  let form = $$props["form"];
  Limiter($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div class="pt-20">`;
      if (form?.incorrect) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="p-4 bg-red-100 text-red-600 my-4 rounded-md">Error while signing out.</p> <p class="mt-4"><a class="underline" href="/">Return to home page</a></p>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<p>Signing out...</p> <p>If you are not redirected automatically, <a href="/" class="underline">click here</a> to go to the home page.</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { form });
  pop();
}
export {
  _page as default
};
