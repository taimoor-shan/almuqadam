import { z as push, F as escape_html, I as store_get, M as unsubscribe_stores, C as pop } from "./index.js";
import { P as PrimaryButton } from "./PrimaryButton.js";
import { c as currentUser } from "./WebsiteNav.js";
function LoginMenu($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div><div class="py-4 text-center">Signed in as ${escape_html(store_get($$store_subs ??= {}, "$currentUser", currentUser).name)}</div> <div class="flex flex-col"><form method="POST" action="/logout?/logout">`;
  PrimaryButton($$payload, {
    type: "submit",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Sign out`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></form></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  LoginMenu as L
};
