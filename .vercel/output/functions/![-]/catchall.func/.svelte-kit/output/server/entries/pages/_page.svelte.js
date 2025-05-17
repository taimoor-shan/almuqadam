import { z as push, G as fallback, I as store_get, J as copy_payload, K as assign_payload, M as unsubscribe_stores, N as bind_props, C as pop, F as escape_html, O as attr_class, P as attr, Q as clsx, R as stringify, S as ensure_array_like, T as store_set, U as head } from "../../chunks/index.js";
import { P as PlainText, I as Image } from "../../chunks/EditorToolbar.js";
import { R as RichText } from "../../chunks/RichText.js";
import { c as classNames } from "../../chunks/util.js";
import { P as PrimaryButton } from "../../chunks/PrimaryButton.js";
import { S as SecondaryButton } from "../../chunks/SecondaryButton.js";
import { L as LoginMenu } from "../../chunks/LoginMenu.js";
import { i as isEditing, c as currentUser, F as Footer } from "../../chunks/WebsiteNav.js";
import { I as Icon } from "../../chunks/Icon.js";
import { W as WebsiteHeader } from "../../chunks/WebsiteHeader.js";
import { N as Notification } from "../../chunks/Notification.js";
import { C as ContactForm } from "../../chunks/ContactForm.js";
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
function EditableVisaService($$payload, $$props) {
  push();
  var $$store_subs;
  let service = fallback(
    $$props["service"],
    () => ({
      image: "",
      title: "",
      description: "",
      link: ""
    }),
    true
  );
  const serviceId = Math.random().toString(36).substring(2, 9);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<a data-w-id="visa-service-item"${attr("href", store_get($$store_subs ??= {}, "$isEditing", isEditing) ? void 0 : service.link)} class="immigration-item w-inline-block border hover:border-green-600"><div class="immigration-image-wrap">`;
    Image($$payload2, {
      alt: service.title,
      class: "immigration-image",
      maxWidth: "600",
      maxHeight: "400",
      quality: "1",
      get src() {
        return service.image;
      },
      set src($$value) {
        service.image = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="immigration-arrow-wrap"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778dc6f77d43b89f3c16ded_icon-05.svg" loading="eager" alt="Icon 05" class="immigration-arrow"></div></div> <div class="immigration-content"><h2 class="immigration-title text-heading">`;
    PlainText($$payload2, {
      get content() {
        return service.title;
      },
      set content($$value) {
        service.title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return service.description;
      },
      set content($$value) {
        service.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="mt-2"><label${attr("for", `service-link-${stringify(serviceId)}`)} class="text-sm text-gray-600 block">Link URL:</label> <input${attr("id", `service-link-${stringify(serviceId)}`)} type="text"${attr("value", service.link)} class="w-full p-1 text-sm border border-gray-300 rounded" placeholder="Enter URL (e.g., /services/visa.html)"></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></a>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { service });
  pop();
}
function EditableVisaServices($$payload, $$props) {
  push();
  var $$store_subs;
  let services = fallback($$props["services"], () => [], true);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(services);
    $$payload2.out += `<div class="grid grid-visa-inline"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let service = each_array[i];
      $$payload2.out += `<div><div class="immigration-collection-list-wrapper w-dyn-list"><div role="list" class="immigration-collection-list w-dyn-items"><div role="listitem" class="immigration-collection-item w-dyn-item">`;
      EditableVisaService($$payload2, {
        get service() {
          return service;
        },
        set service($$value) {
          service = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex justify-end mt-2 space-x-2"><button class="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"${attr("disabled", i === 0, true)} title="Move up"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button class="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"${attr("disabled", i === services.length - 1, true)} title="Move down"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button> <button class="p-1 rounded bg-red-100 hover:bg-red-200 text-red-700" title="Delete service"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div></div></div>`;
    }
    $$payload2.out += `<!--]--></div> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-4">`;
      SecondaryButton($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Add Visa Service`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { services });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const EMAIL = "info@almuqadam.com";
  const FAQS_PLACEHOLDER = `
		<h2>Question 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
    <h2>Question 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
	`;
  const BIO_PLACEHOLDER = `
		<p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What's missing is the ability to <strong>make edits without changing the source code</strong>.</p>
		<p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
    <p>If you have questions or need any help, contact me.</p>
	`;
  const TESTIMONIALS_PLACEHOLDER = [
    {
      text: '"Almuqadam made my visa application process so easy! They guided me through every step and handled all the paperwork efficiently. The whole process was smooth and professional."',
      image: "/images/person-placeholder.jpg",
      name: "Sarah Johnson · Dubai, UAE"
    }
  ];
  const COUNTERS_PLACEHOLDER = [
    {
      value: "1000",
      suffix: "+",
      description: "Successful visa applications processed worldwide."
    },
    {
      value: "98",
      suffix: "%",
      description: "Client satisfaction rate with our services."
    },
    {
      value: "15",
      suffix: "+",
      description: "Years of combined visa consultancy experience in our team."
    }
  ];
  const STEPS_PLACEHOLDER = [
    {
      title: "Free Assessment",
      description: "Send us a message or fill out the short form — we’ll review your case and let you know if you qualify, no strings attached."
    },
    {
      title: "Documentation Support",
      description: "We’ll tell you exactly what documents you need, help you prepare them, and make sure everything is in order."
    },
    {
      title: "Submit & Wait with Confidence",
      description: "We guide you through the application process and keep you updated. No guesswork, no stress — just clear steps all the way."
    }
  ];
  let title, subtitle, aboutBlurb, steps, stepsTitle, counters, heroImage, showUserMenu, contactTitle, contactSubtitle, officeAddress1, phone1, email, visaServices;
  let showNotification = false;
  let notificationMessage = "";
  function getGoogleMapsUrl(address) {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    title = data.page?.title || "Almuqadam";
    data.page?.logoText || "Almuqadam";
    subtitle = data.page?.subtitle || "We Assist You in Your Global Journey";
    aboutBlurb = data.page?.aboutBlurb || "We are UK-based and here to help you get your visit visa without the hassle. We work mostly with students and professionals who want to travel to Europe, the US, or Australia. There is no jargon, no false hopes—just real help from someone who’s done it hundreds of times.";
    data.page?.faqs || FAQS_PLACEHOLDER;
    JSON.parse(JSON.stringify(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER));
    counters = JSON.parse(JSON.stringify(data.page?.counters || COUNTERS_PLACEHOLDER));
    JSON.parse(JSON.stringify(data.page?.introStep1 || {
      label: "THE PROBLEM",
      title: "The problem statement",
      description: "Describe the problem you are solving in a short sentence."
    }));
    JSON.parse(JSON.stringify(data.page?.introStep2 || {
      label: "THE DREAM",
      title: "This is how it should be.",
      description: "Describe why it should be like that."
    }));
    JSON.parse(JSON.stringify(data.page?.introStep3 || {
      label: "THE REALITY",
      title: "A statement why it is not that easy.",
      description: "Describe the reality a bit more."
    }));
    JSON.parse(JSON.stringify(data.page?.introStep4 || {
      label: "THE PROMISE",
      title: "Still the solution is worth it.",
      description: "And why this is, should be described here."
    }));
    heroImage = data.page?.heroImage || "/images/ch_hero.jpeg";
    data.page?.whatWeDoTitle || "What We Do";
    data.page?.bioPicture || "/images/person-placeholder.jpg";
    data.page?.bioTitle || "Hi, I'm Almuqadam — I want your website to be editable.";
    data.page?.bio || BIO_PLACEHOLDER;
    steps = JSON.parse(JSON.stringify(data.page?.steps || STEPS_PLACEHOLDER));
    stepsTitle = data.page?.stepsTitle || "Our Visa Process – Just 3 Simple Steps";
    data.page?.galleryTitle || "Visa Destinations Gallery";
    JSON.parse(JSON.stringify(data.page?.galleryImages || [
      {
        src: "/images/person-placeholder.jpg",
        alt: "Gallery image 1"
      },
      {
        src: "/images/person-placeholder.jpg",
        alt: "Gallery image 2"
      },
      {
        src: "/images/person-placeholder.jpg",
        alt: "Gallery image 3"
      },
      {
        src: "/images/person-placeholder.jpg",
        alt: "Gallery image 4"
      },
      {
        src: "/images/person-placeholder.jpg",
        alt: "Gallery image 5"
      }
    ]));
    contactTitle = data.page?.contactTitle || "Contact Us";
    contactSubtitle = data.page?.contactSubtitle || "Get in touch with our team";
    officeAddress1 = data.page?.officeAddress1 || "19 Ashwood Close, Greater London, United Kingdom";
    phone1 = data.page?.phone1 || "+44 7700 900123";
    email = data.page?.email || "info@almuqadam.com";
    visaServices = data.page?.visaServices || [
      {
        image: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677e7240e3e34d7fa6783b18_service-01.avif",
        title: "Schengen Visa",
        description: "Travel across 25+ European countries with one visa. Perfect for tourism, business trips, or visiting family.",
        link: "immigration/visa-application-assistance.html"
      },
      {
        image: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677e724aed0c2bd50318aff5_service-02.avif",
        title: "USA Visit Visa",
        description: "Heading to the States? We guide you through the tricky B1/B2 process and help avoid common pitfalls.",
        link: "immigration/permanent-residency-solutions.html"
      },
      {
        image: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677e72530d4acb3027e0ab80_service-03.avif",
        title: "Australia Visit Visa",
        description: "From holidays to short business trips, we'll help you apply with confidence and avoid delays.",
        link: "immigration/citizenship-applications.html"
      }
    ];
    showNotification = false;
    store_set(isEditing, false);
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(counters);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Almuqadam - Explore Beyond the boundries | Visit Visa Consultancy</title>`;
      $$payload3.out += `<meta name="description" content="Expert visa consultancy services to help you explore the world. We specialize in visit visas with high approval rates and personalized guidance."> <link rel="alternate" hreflang="en" href="https://almuqadam.com"> <link rel="canonical" href="https://almuqadam.com">`;
    });
    WebsiteHeader($$payload2, {
      get showUserMenu() {
        return showUserMenu;
      },
      set showUserMenu($$value) {
        showUserMenu = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        PrimaryButton($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Edit page`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        LoginMenu($$payload3);
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <section class="hero-section"><div class="w-layout-blockcontainer container-medium w-container"><div class="hero-content-center"><h1 class="hero-title-center">`;
    PlainText($$payload2, {
      get content() {
        return title;
      },
      set content($$value) {
        title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h1> <p>`;
    PlainText($$payload2, {
      get content() {
        return subtitle;
      },
      set content($$value) {
        subtitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p> <div class="hero-button-list"><a href="#contactSec" class="button-gradient w-button">Free Visa Assessment</a></div></div></div> <div class="hero-image-wrap">`;
    Image($$payload2, {
      class: "hero-image",
      maxWidth: "1920",
      maxHeight: "1080",
      quality: "1",
      alt: "Hero image",
      get src() {
        return heroImage;
      },
      set src($$value) {
        heroImage = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="hero-blur gradient-2"></div> <div class="hero-blur-divider"></div></section> <section class="about-section section-spacing-bottom"><div class="w-layout-blockcontainer container w-container"><div class="about-content-right"><span class="text-primary-1">About Us</span> <div><h2 class="about-title-right">`;
    PlainText($$payload2, {
      get content() {
        return aboutBlurb;
      },
      set content($$value) {
        aboutBlurb = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2></div> <div class="grid-about-counter"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let counter = each_array[i];
      Counter($$payload2, {
        firstEntry: i === 0,
        lastEntry: i === counters.length - 1,
        get counter() {
          return counter;
        },
        set counter($$value) {
          counter = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-4">`;
      SecondaryButton($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Add counter`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></div> <div data-w-id="1bf37b48-b442-9317-453e-3e872ec208bd" class="vector-01"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image"></div></section> <section class="immigration-section"><div class="w-layout-blockcontainer container w-container"><div data-w-id="943f276d-10dd-ea22-23fd-05ec45819578" style="" class="immigration-wrap"><div class="section-title immigration-section-title"><span class="text-primary-1">Our Services</span> <h2>Countries We Serve</h2></div> <div><div><div>`;
    EditableVisaServices($$payload2, {
      get services() {
        return visaServices;
      },
      set services($$value) {
        visaServices = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div></div></div></section> <section class="step-section section-spacing"><div class="w-layout-blockcontainer container w-container"><div data-w-id="29680200-4a43-3181-792e-694af7a13e5b" class="section-title text-center"><span class="text-primary-1">How It Works</span> <h2>`;
    PlainText($$payload2, {
      get content() {
        return stepsTitle;
      },
      set content($$value) {
        stepsTitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2></div></div> <div style="" class="step-wrap"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778e316e8221903bac49617_vector-02.svg" loading="eager" alt="Vector 02" class="vector-02"> <div class="w-layout-blockcontainer container w-container"><div class="grid-step"><div class="step-item first"><div class="step-number gradient-1"><div>01</div></div> <h3 class="step-title">`;
    PlainText($$payload2, {
      get content() {
        return steps[0].title;
      },
      set content($$value) {
        steps[0].title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h3> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return steps[0].description;
      },
      set content($$value) {
        steps[0].description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p></div> <div class="step-item center"><div class="step-number bg-black"><div>02</div></div> <h3 class="step-title">`;
    PlainText($$payload2, {
      get content() {
        return steps[1].title;
      },
      set content($$value) {
        steps[1].title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h3> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return steps[1].description;
      },
      set content($$value) {
        steps[1].description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p></div> <div class="step-item"><div class="step-number gradient-1"><div>03</div></div> <h3 class="step-title">`;
    PlainText($$payload2, {
      get content() {
        return steps[2].title;
      },
      set content($$value) {
        steps[2].title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h3> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return steps[2].description;
      },
      set content($$value) {
        steps[2].description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p></div></div></div></div></section>  <section id="contactSec" class="section-spacing" style="padding-top: 0;"><div class="w-layout-blockcontainer container w-container"><div class="grid-contact-split items-center"><div class="contact-info"><div class="section-title text-start mb-12"><h2>`;
    PlainText($$payload2, {
      get content() {
        return contactTitle;
      },
      set content($$value) {
        contactTitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2> <p class="text-xl mt-4">`;
    PlainText($$payload2, {
      get content() {
        return contactSubtitle;
      },
      set content($$value) {
        contactSubtitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p></div> <div class="phone"><h6 class="text-blue-600 mb-3">Phone</h6> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex gap-2">`;
      Icon($$payload2, {
        class: "text-blue-600",
        icon: "carbon:phone",
        width: "24",
        height: "24"
      });
      $$payload2.out += `<!----> `;
      PlainText($$payload2, {
        get content() {
          return phone1;
        },
        set content($$value) {
          phone1 = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<a${attr("href", `tel:${stringify(phone1)}`)} class="hover:text-blue-600 transition-colors flex gap-2">`;
      Icon($$payload2, {
        class: "text-blue-600",
        icon: "carbon:phone",
        width: "24",
        height: "24"
      });
      $$payload2.out += `<!----> ${escape_html(phone1)}</a>`;
    }
    $$payload2.out += `<!--]--></div> <div class="email"><h6 class="text-blue-600 mb-3">Email</h6> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex gap-2">`;
      Icon($$payload2, {
        class: "text-blue-600",
        icon: "ic:baseline-email",
        width: "24",
        height: "24"
      });
      $$payload2.out += `<!----> `;
      PlainText($$payload2, {
        get content() {
          return email;
        },
        set content($$value) {
          email = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<a${attr("href", `mailto:${stringify(email)}`)} class="hover:text-blue-600 transition-colors flex gap-2">`;
      Icon($$payload2, {
        icon: "mdi:envelope-outline",
        width: "24",
        height: "24"
      });
      $$payload2.out += `<!----> ${escape_html(email)}</a>`;
    }
    $$payload2.out += `<!--]--></div> <div class="address"><h6 class="text-blue-600 mb-3">Address</h6> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p>`;
      RichText($$payload2, {
        get content() {
          return officeAddress1;
        },
        set content($$value) {
          officeAddress1 = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></p>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<p><a${attr("href", getGoogleMapsUrl(officeAddress1))} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 transition-colors flex gap-2">`;
      Icon($$payload2, {
        icon: "akar-icons:location",
        width: "24",
        height: "24"
      });
      $$payload2.out += `<!----> ${escape_html(officeAddress1)}</a></p>`;
    }
    $$payload2.out += `<!--]--></div> <div></div></div> <div class="contact-item">`;
    ContactForm($$payload2, {
      title: "Get a Free Visa Assessment",
      recipientEmail: EMAIL
    });
    $$payload2.out += `<!----></div></div></div></section> `;
    Footer($$payload2, { counter: "/" });
    $$payload2.out += `<!----> `;
    Notification($$payload2, {
      type: "success",
      message: notificationMessage,
      duration: 5e3,
      get show() {
        return showNotification;
      },
      set show($$value) {
        showNotification = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
