import { z as push, G as fallback, O as store_get, I as copy_payload, J as assign_payload, P as unsubscribe_stores, K as bind_props, C as pop, F as escape_html, M as attr_class, T as attr, N as clsx } from "./index.js";
import { i as isEditing, P as PlainText } from "./EditorToolbar.js";
import { c as classNames } from "./util.js";
function Counter($$payload, $$props) {
  push();
  var $$store_subs;
  let counter = $$props["counter"];
  let firstEntry = fallback($$props["firstEntry"], false);
  let lastEntry = fallback($$props["lastEntry"], false);
  let numericValue = parseInt(counter.value.replace(/\D/g, "")) || 0;
  let displayValue = 0;
  let animationDuration = 2e3;
  let isAnimating = false;
  let hasAnimated = false;
  function animateCounter(targetValue) {
    if (typeof window === "undefined") {
      displayValue = targetValue;
      return;
    }
    if (hasAnimated || isAnimating) return;
    isAnimating = true;
    const startValue = displayValue;
    const startTime = window.performance.now();
    function updateValue(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      displayValue = startValue + (targetValue - startValue) * easedProgress;
      if (progress < 1) {
        window.requestAnimationFrame(updateValue);
      } else {
        displayValue = targetValue;
        isAnimating = false;
        hasAnimated = true;
      }
    }
    window.requestAnimationFrame(updateValue);
  }
  function setupIntersectionObserver() {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      displayValue = numericValue;
      return;
    }
    const options = {
      root: null,
      // Use the viewport
      rootMargin: "0px",
      threshold: 0.1
      // Trigger when at least 10% of the element is visible
    };
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && !store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
            animateCounter(numericValue);
          }
        });
      },
      options
    );
    return () => {
    };
  }
  if (!store_get($$store_subs ??= {}, "$isEditing", isEditing) && !isAnimating && !hasAnimated) {
    numericValue = parseInt(counter.value.replace(/\D/g, "")) || 0;
    hasAnimated = false;
    displayValue = 0;
    setupIntersectionObserver();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="about-counter-item"><h3 class="about-counter-title">`;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      PlainText($$payload2, {
        get content() {
          return counter.value;
        },
        set content($$value) {
          counter.value = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `${escape_html(Math.round(displayValue))}`;
    }
    $$payload2.out += `<!--]--> <span class="text-primary-1">`;
    PlainText($$payload2, {
      get content() {
        return counter.suffix;
      },
      set content($$value) {
        counter.suffix = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span></h3> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return counter.description;
      },
      set content($$value) {
        counter.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex mt-2 space-x-2 justify-end"><button class="w-6 h-6 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white" title="Delete counter" aria-label="Delete counter"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(clsx(classNames("w-6 h-6 p-1 rounded-full hover:bg-gray-100", firstEntry ? "opacity-20" : "")))} title="Move up" aria-label="Move counter up"${attr("disabled", firstEntry, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(clsx(classNames("w-6 h-6 p-1 rounded-full hover:bg-gray-100", lastEntry ? "opacity-20" : "")))} title="Move down" aria-label="Move counter down"${attr("disabled", lastEntry, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { counter, firstEntry, lastEntry });
  pop();
}
export {
  Counter as C
};
