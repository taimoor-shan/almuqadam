import { z as push, F as escape_html, O as store_get, P as unsubscribe_stores, C as pop } from "./index.js";
import "./client.js";
import { P as PrimaryButton } from "./PrimaryButton.js";
import { c as currentUser } from "./EditorToolbar.js";
function LoginMenu($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div><div class="py-4 text-center">Signed in as ${escape_html(store_get($$store_subs ??= {}, "$currentUser", currentUser).name)}</div> <div class="flex flex-col">`;
  PrimaryButton($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->Sign out`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  LoginMenu as L
};
