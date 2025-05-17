import { G as fallback, P as attr, N as bind_props, U as head, C as pop, z as push } from "../../../chunks/index.js";
import { L as Limiter } from "../../../chunks/Limiter.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
function Input($$payload, $$props) {
  let value = fallback($$props["value"], "");
  let id = $$props["id"];
  let type = fallback($$props["type"], "text");
  let name = $$props["name"];
  let required = fallback($$props["required"], false);
  let inputRef = fallback($$props["inputRef"], null);
  let placeholder = fallback($$props["placeholder"], "");
  $$payload.out += `<input autocomplete="off"${attr("placeholder", placeholder)}${attr("name", name)}${attr("id", id)}${attr("required", required, true)}${attr("value", value)} class="border focus focus:border-gray-800 focus:ring-gray-800">`;
  bind_props($$props, {
    value,
    id,
    type,
    name,
    required,
    inputRef,
    placeholder
  });
}
function _page($$payload, $$props) {
  push();
  let form = $$props["form"];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Login</title>`;
  });
  Limiter($$payload, {
    children: ($$payload2) => {
      if (form?.incorrect) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="p-4 bg-red-100 text-red-600 my-4 rounded-md">Login incorrect. Please try again.</p>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="w-full flex flex-col space-y-4 mt-12 mb-4"><form method="POST" class="flex flex-col space-y-8"><div class="flex flex-col"><label for="password" class="font-semibold mb-2 text-2xl">Enter Admin password</label> `;
      Input($$payload2, {
        type: "password",
        name: "password",
        id: "password"
      });
      $$payload2.out += `<!----></div> `;
      PrimaryButton($$payload2, {
        type: "submit",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Login`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div><a class="underline" href="/">Return to the homepage</a></div></form></div>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { form });
  pop();
}
export {
  _page as default
};
