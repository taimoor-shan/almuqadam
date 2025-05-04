import { z as push, G as fallback, I as copy_payload, J as assign_payload, K as bind_props, C as pop, M as attr_class, N as clsx, O as store_get, P as unsubscribe_stores, Q as store_set, R as ensure_array_like, S as head } from "../../chunks/index.js";
import { P as PlainText, i as isEditing, c as currentUser, N as NotEditable, F as Footer } from "../../chunks/EditorToolbar.js";
import { R as RichText } from "../../chunks/RichText.js";
import { c as classNames } from "../../chunks/util.js";
import { P as PrimaryButton } from "../../chunks/PrimaryButton.js";
import { S as SecondaryButton } from "../../chunks/SecondaryButton.js";
import { L as LoginMenu } from "../../chunks/LoginMenu.js";
import { A as ArticleTeaser } from "../../chunks/ArticleTeaser.js";
import { I as Image } from "../../chunks/Image.js";
import { C as Counter } from "../../chunks/Counter.js";
import { W as WebsiteHeader } from "../../chunks/WebsiteHeader.js";
function Testimonial($$payload, $$props) {
  push();
  var $$store_subs;
  let testimonial = $$props["testimonial"];
  let firstEntry = fallback($$props["firstEntry"], false);
  let lastEntry = fallback($$props["lastEntry"], false);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(clsx(classNames(firstEntry ? "pt-2 pb-8 sm:pb-12" : "py-8 sm:py-12")))}><div class="max-w-screen-md mx-auto px-6 flex space-x-6 sm:space-x-8 relative"><div class="flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 overflow-hidden relative rounded-full">`;
    Image($$payload2, {
      class: "rounded-full",
      maxWidth: 160,
      maxHeight: 160,
      quality: 0.8,
      alt: testimonial.name,
      get src() {
        return testimonial.image;
      },
      set src($$value) {
        testimonial.image = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="flex-1"><div class="text-lg sm:text-2xl italic">`;
    PlainText($$payload2, {
      get content() {
        return testimonial.text;
      },
      set content($$value) {
        testimonial.text = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="mt-4 md:text-xl font-medium">`;
    PlainText($$payload2, {
      get content() {
        return testimonial.name;
      },
      set content($$value) {
        testimonial.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="space-y-2 flex flex-col"><button class="w-6 h-6 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(clsx(classNames("w-6 h-6 p-1 rounded-full hover:bg-gray-100", firstEntry ? "opacity-20" : "")))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(clsx(classNames("w-6 h-6 p-1 rounded-full hover:bg-gray-100", lastEntry ? "opacity-20" : "")))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { testimonial, firstEntry, lastEntry });
  pop();
}
function IntroStep($$payload, $$props) {
  push();
  let intro = $$props["intro"];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="my-12"><div class="bg-white relative py-8 mt-20 mb-20"><div class="font-bold text-center text-sm sm:text-base">`;
    PlainText($$payload2, {
      get content() {
        return intro.label;
      },
      set content($$value) {
        intro.label = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="text-2xl md:text-5xl font-bold text-center pt-2">`;
    PlainText($$payload2, {
      get content() {
        return intro.title;
      },
      set content($$value) {
        intro.title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="max-w-md mx-auto text-lg md:text-2xl text-center pt-2 md:pt-4">`;
    RichText($$payload2, {
      get content() {
        return intro.description;
      },
      set content($$value) {
        intro.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { intro });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const EMAIL = "michael@letsken.com";
  const PHONE_NUMBER = "43 664 1533015";
  const FAQS_PLACEHOLDER = `
		<h2>Question 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
    <h2>Question 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
	`;
  const BIO_PLACEHOLDER = `
		<p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What’s missing is the ability to <strong>make edits without changing the source code</strong>.</p>
		<p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
    <p>If you have questions or need any help, contact me.</p>
	`;
  const TESTIMONIALS_PLACEHOLDER = [
    {
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”",
      image: "/images/person-placeholder.jpg",
      name: "Jane Doe · jane-doe.org"
    }
  ];
  const COUNTERS_PLACEHOLDER = [
    {
      value: "10",
      suffix: "K+",
      description: "Assisting thousands of clients in achieving their global goals."
    },
    {
      value: "98",
      suffix: "%",
      description: "Consistently achieving successful visa outcomes."
    },
    {
      value: "18",
      suffix: "+",
      description: "Expert guidance throughout your immigration journey."
    }
  ];
  let title, subtitle, aboutBlurb, testimonials, counters, faqs, introStep1, introStep2, introStep3, introStep4, bioTitle, bioPicture, bio, heroImage, showUserMenu;
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    title = data.page?.title || "Untitled Website";
    subtitle = data.page?.subtitle || "Building bridges for your global future";
    aboutBlurb = data.page?.aboutBlurb || "We are dedicated to helping individuals and families navigate the complex world of visas and immigration with ease. With years of experience and a commitment to personalized service, our team of experts provides end-to-end support, from initial consultation to visa approval.";
    faqs = data.page?.faqs || FAQS_PLACEHOLDER;
    testimonials = JSON.parse(JSON.stringify(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER));
    counters = JSON.parse(JSON.stringify(data.page?.counters || COUNTERS_PLACEHOLDER));
    introStep1 = JSON.parse(JSON.stringify(data.page?.introStep1 || {
      label: "THE PROBLEM",
      title: "The problem statement",
      description: "Describe the problem you are solving in a short sentence."
    }));
    introStep2 = JSON.parse(JSON.stringify(data.page?.introStep2 || {
      label: "THE DREAM",
      title: "This is how it should be.",
      description: "Describe why it should be like that."
    }));
    introStep3 = JSON.parse(JSON.stringify(data.page?.introStep3 || {
      label: "THE REALITY",
      title: "A statement why it is not that easy.",
      description: "Describe the reality a bit more."
    }));
    introStep4 = JSON.parse(JSON.stringify(data.page?.introStep4 || {
      label: "THE PROMISE",
      title: "Still the solution is worth it.",
      description: "And why this is, should be described here."
    }));
    heroImage = data.page?.heroImage || "/images/ch_hero.jpeg";
    bioPicture = data.page?.bioPicture || "/images/person-placeholder.jpg";
    bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    store_set(isEditing, false);
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(counters);
    const each_array_1 = ensure_array_like(testimonials);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Make your website editable</title>`;
      $$payload3.out += `<meta name="description" content="Make changes to your website while browsing it."> <link rel="alternate" hreflang="en" href="https://editable.website"> <link rel="canonical" href="https://editable.website">`;
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
    $$payload2.out += `<!----> <section data-w-id="3089b8af-5f0f-4ac4-5520-f107362feacf" class="hero-section"><div class="w-layout-blockcontainer container-medium w-container"><div class="hero-content-center"><h1 class="hero-title-center">`;
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
    $$payload2.out += `<!----></p> <div class="hero-button-list"><a href="immigration.html" class="button-gradient w-button">Immigration services</a><a href="contact.html" class="button-secondary-2-outline w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ce50f6ef7ca3e10af73f_icon-03.svg" loading="eager" alt="Icon 03" class="button-icon"> <div>Schedule a free call</div></a></div></div></div> <div class="hero-image-wrap">`;
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
    $$payload2.out += `<!----></div> <div class="hero-blur gradient-2"></div> <div class="hero-blur-divider"></div></section> <section class="about-section section-spacing-bottom"><div class="w-layout-blockcontainer container w-container"><div data-w-id="89d3ec49-ae5a-0e45-9769-846ab7ffba8e" class="about-content-right"><div><h2 class="about-title-right">`;
    PlainText($$payload2, {
      get content() {
        return aboutBlurb;
      },
      set content($$value) {
        aboutBlurb = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2><a href="about.html" class="button-gradient w-button">Know more about us</a></div> <div class="grid-about-counter"><!--[-->`;
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
    $$payload2.out += `<!--]--></div></div></div> <div data-w-id="1bf37b48-b442-9317-453e-3e872ec208bd" class="vector-01"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image"></div></section> <div class="pt-12 md:pt-24 border-gray-100 border-b-2"><div class="max-w-screen-md mx-auto px-6"><div class="relative"><div class="w-1 bg-gray-900 absolute inset-0 -top-8 bottom-12 mx-auto z-0"><div class="w-4 h-4 rounded-full bg-gray-900 absolute -top-1 -left-[6px]"></div></div> <div class="z-10">`;
    IntroStep($$payload2, {
      get intro() {
        return introStep1;
      },
      set intro($$value) {
        introStep1 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IntroStep($$payload2, {
      get intro() {
        return introStep2;
      },
      set intro($$value) {
        introStep2 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IntroStep($$payload2, {
      get intro() {
        return introStep3;
      },
      set intro($$value) {
        introStep3 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    IntroStep($$payload2, {
      get intro() {
        return introStep4;
      },
      set intro($$value) {
        introStep4 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div> <div class="relative h-14"><div class="w-1 bg-gray-900 absolute inset-0 -top-16 bottom-12 mx-auto z-0"><div class="absolute -bottom-2 -left-[7px] h-0 w-0 border-x-[9px] border-x-transparent border-t-[10px] border-gray-900"></div></div></div> <div class="text-center mb-32">`;
    PrimaryButton($$payload2, {
      size: "lg",
      type: "button",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Create an editable website`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div></div> <div class="bg-white pb-6 sm:pb-12"><div class="max-w-screen-md mx-auto px-6"><div class="font-bold text-sm sm:text-base py-12 sm:pt-24 pb-8">WHAT PEOPLE SAY</div></div> <!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let testimonial = each_array_1[i];
      Testimonial($$payload2, {
        firstEntry: i === 0,
        lastEntry: i === testimonials.length - 1,
        get testimonial() {
          return testimonial;
        },
        set testimonial($$value) {
          testimonial = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center pb-12 border-b border-gray-100">`;
      SecondaryButton($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Add testimonial`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (data.articles.length > 0) {
      $$payload2.out += "<!--[-->";
      NotEditable($$payload2, {
        children: ($$payload3) => {
          const each_array_2 = ensure_array_like(data.articles);
          $$payload3.out += `<div class="bg-white border-t-2 border-gray-100 pb-10 sm:pb-16"><div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24"><div class="font-bold text-sm sm:text-base">FROM THE BLOG</div></div> <!--[-->`;
          for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
            let article = each_array_2[i];
            ArticleTeaser($$payload3, { article, firstEntry: i === 0 });
          }
          $$payload3.out += `<!--]--></div>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div id="contact" class="bg-white border-t-2 border-b-2 border-gray-100 pb-12 sm:pb-24"><div class="max-w-screen-md mx-auto px-6"><div class="pt-12 sm:pt-24 pb-12 text-center"><div class="w-48 h-48 md:w-72 md:h-72 mx-auto overflow-hidden relative rounded-full">`;
    Image($$payload2, {
      class: "block w-48 h-48 md:w-72 md:h-72 rounded-full",
      maxWidth: "384",
      maxHeight: "384",
      quality: "0.8",
      alt: "Michael Aufreiter",
      get src() {
        return bioPicture;
      },
      set src($$value) {
        bioPicture = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div> <div><h1 class="text-3xl md:text-5xl font-bold">`;
    PlainText($$payload2, {
      get content() {
        return bioTitle;
      },
      set content($$value) {
        bioTitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h1></div> <div class="prose md:prose-xl pb-6">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return bio;
      },
      set content($$value) {
        bio = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> `;
    NotEditable($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<div class="flex flex-col sm:flex-row sm:space-x-6 md:space-x-8 space-y-4 sm:space-y-0">`;
        PrimaryButton($$payload3, {
          size: "lg",
          href: `mailto:${EMAIL}`,
          children: ($$payload4) => {
            $$payload4.out += `<!---->Email`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        SecondaryButton($$payload3, {
          size: "lg",
          href: `https://wa.me/${PHONE_NUMBER.replace(/\s+/g, "")}`,
          children: ($$payload4) => {
            $$payload4.out += `<!---->WhatsApp (+43 664 1533015)`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div> <div class="bg-white"><div class="max-w-screen-md mx-auto px-6"><div class="font-bold text-sm sm:text-base pt-12 sm:pt-24 -mb-6 md:-mb-12">FAQs</div> <div class="prose md:prose-xl pb-12 sm:pb-24">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return faqs;
      },
      set content($$value) {
        faqs = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div> `;
    Footer($$payload2, { counter: "/" });
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
