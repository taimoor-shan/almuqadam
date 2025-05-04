import { I as copy_payload, J as assign_payload, K as bind_props, C as pop, z as push, Q as store_set, R as ensure_array_like, S as head, T as attr, O as store_get, M as attr_class, P as unsubscribe_stores, F as escape_html } from "../../../chunks/index.js";
import { c as currentUser, P as PlainText, F as Footer, i as isEditing } from "../../../chunks/EditorToolbar.js";
import { R as RichText } from "../../../chunks/RichText.js";
import "../../../chunks/util.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
import { S as SecondaryButton } from "../../../chunks/SecondaryButton.js";
import { L as LoginMenu } from "../../../chunks/LoginMenu.js";
import { I as Image } from "../../../chunks/Image.js";
import { C as Counter } from "../../../chunks/Counter.js";
import { E as EditableWebsiteTeaser } from "../../../chunks/EditableWebsiteTeaser.js";
import { W as WebsiteHeader } from "../../../chunks/WebsiteHeader.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const ABOUT_CONTENT_PLACEHOLDER = `
    <h2>Our Mission</h2>
    <p>At Naseer UK, our mission is to provide exceptional immigration services with integrity, expertise, and personalized attention. We believe in making the immigration process transparent, stress-free, and successful for every client.</p>

    <h2>Our Approach</h2>
    <p>We take a client-centered approach to immigration services. Each case is unique, and we develop tailored strategies that address your specific needs and circumstances. Our team stays up-to-date with the latest immigration laws and policies to ensure you receive the most current and accurate advice.</p>

    <h2>Our Values</h2>
    <ul>
      <li><strong>Integrity:</strong> We maintain the highest ethical standards in all our dealings.</li>
      <li><strong>Excellence:</strong> We strive for excellence in every aspect of our service.</li>
      <li><strong>Compassion:</strong> We understand the emotional journey of immigration and provide support throughout the process.</li>
      <li><strong>Transparency:</strong> We believe in clear communication and keeping our clients informed at every step.</li>
    </ul>
  `;
  const TEAM_MEMBERS_PLACEHOLDER = [
    {
      name: "John Smith",
      title: "Immigration Consultant",
      bio: "John has over 15 years of experience in immigration law and has helped hundreds of families successfully navigate the immigration process.",
      image: "/images/person-placeholder.jpg"
    },
    {
      name: "Sarah Johnson",
      title: "Legal Advisor",
      bio: "Sarah specializes in complex immigration cases and brings a wealth of knowledge in international law to our team.",
      image: "/images/person-placeholder.jpg"
    }
  ];
  const WHO_WE_ARE_PLACEHOLDER = {
    title: "Who we are",
    content: `
      <p>We are a dedicated visa and immigration agency committed to helping individuals and families achieve their dreams of living, working, and studying abroad. With years of experience and a team of experts, we simplify the complexities of immigration processes to ensure a smooth and successful journey for our clients.</p>`,
    featureItems: [
      {
        title: "Our mission",
        description: "Providing tailored visa and immigration solutions to help people achieve their global aspirations."
      },
      {
        title: "Our vision",
        description: "To be a trusted partner, guiding individuals and families toward a brighter future abroad."
      }
    ],
    vectorImage: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector.avif"
  };
  const FEATURES_PLACEHOLDER = [
    {
      icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg",
      text: "Expert team"
    },
    {
      icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg",
      text: "High approval rates"
    },
    {
      icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg",
      text: "Fast and reliable service"
    }
  ];
  const HERO_COUNTERS_PLACEHOLDER = [
    {
      value: "10",
      suffix: "K+",
      description: "Achieving their global goals"
    },
    {
      value: "98",
      suffix: "%",
      description: "Successful visa outcomes"
    },
    {
      value: "18",
      suffix: "+",
      description: "Expert guidance"
    },
    {
      value: "15",
      suffix: "+",
      description: "Visa services"
    }
  ];
  const WHY_CHOOSE_US_PLACEHOLDER = {
    title: "Why choose us",
    items: [
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f1eb128761b662609_icon-15.svg",
        title: "24/7 Support",
        description: "Our team is available around the clock to assist you."
      },
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e2037b52b05c1c0850d_icon-14.svg",
        title: "Personalized solutions",
        description: "Every case is unique, and we tailor our services to meet your specific needs."
      },
      {
        icon: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f308938b15683f7f8_icon-16.svg",
        title: "Transparent process",
        description: "Clear communication and guidance at every step."
      }
    ]
  };
  let pageTitle, heroTitle, heroSpanText, features, heroCounters, heroImages, whoWeAre, whyChooseUs, showUserMenu, globalData, cta;
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    globalData = data.globalData;
    cta = globalData?.cta;
    pageTitle = data.page?.pageTitle || "About Naseer UK";
    data.page?.pageSubtitle || "Your Trusted Partner in Immigration Services";
    data.page?.aboutContent || ABOUT_CONTENT_PLACEHOLDER;
    data.page?.aboutImage || "/images/about-image.jpg";
    heroTitle = data.page?.heroTitle || "Simplifying your";
    heroSpanText = data.page?.heroSpanText || "immigration";
    JSON.parse(JSON.stringify(data.page?.teamMembers || TEAM_MEMBERS_PLACEHOLDER));
    features = JSON.parse(JSON.stringify(data.page?.features || FEATURES_PLACEHOLDER));
    heroCounters = JSON.parse(JSON.stringify(data.page?.heroCounters || HERO_COUNTERS_PLACEHOLDER));
    heroImages = data.page?.heroImages || [
      "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/678dedda5bfb461092e80c48_about-image-06.avif",
      "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/678dedda83dfb748c537b207_about-image-04.avif"
    ];
    whoWeAre = JSON.parse(JSON.stringify(data.page?.whoWeAre || WHO_WE_ARE_PLACEHOLDER));
    if (!whoWeAre.featureItems) {
      whoWeAre.featureItems = [
        {
          title: "Our mission",
          description: "Providing tailored visa and immigration solutions to help people achieve their global aspirations."
        },
        {
          title: "Our vision",
          description: "To be a trusted partner, guiding individuals and families toward a brighter future abroad."
        }
      ];
    }
    whyChooseUs = JSON.parse(JSON.stringify(data.page?.whyChooseUs || WHY_CHOOSE_US_PLACEHOLDER));
    store_set(isEditing, false);
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(features);
    const each_array_1 = ensure_array_like(heroImages);
    const each_array_2 = ensure_array_like(heroCounters);
    const each_array_4 = ensure_array_like(whyChooseUs.items);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(pageTitle)} - Naseer UK</title>`;
      $$payload3.out += `<meta name="description" content="Learn more about our immigration services and our team."> <link rel="canonical" href="https://naseeruk.com/about">`;
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
    $$payload2.out += `<!----> <section class="about-hero-section"><div class="w-layout-blockcontainer container w-container"><div data-w-id="703bbe20-6d1e-7f1e-e9df-87bf43072045" style="" class="hero-content-center"><h1 class="about-hero-title">`;
    PlainText($$payload2, {
      get content() {
        return heroTitle;
      },
      set content($$value) {
        heroTitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <span class="heading-serif">`;
    PlainText($$payload2, {
      get content() {
        return heroSpanText;
      },
      set content($$value) {
        heroSpanText = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span> journey with us</h1> <div class="about-feature-list"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let feature = each_array[i];
      $$payload2.out += `<div class="about-feature-list-item"><img${attr("src", feature.icon)} loading="eager" class="about-feature-list-icon"${attr("alt", `Feature icon for ${feature.text}`)}> <div>`;
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
        $$payload2.out += `<div class="flex ml-2 space-x-1"><button class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white" title="Delete feature" aria-label="Delete feature"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? "opacity-20" : ""}`)} title="Move up" aria-label="Move feature up"${attr("disabled", i === 0, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === features.length - 1 ? "opacity-20" : ""}`)} title="Move down" aria-label="Move feature down"${attr("disabled", i === features.length - 1, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-2"><button class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1">Add feature</button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <a href="contact.html" class="button-gradient w-button">Start your journey</a></div> <div data-w-id="0cbb155b-4be4-4f7d-28cc-eb1e82b3aaf1" style="" class="grid-about-hero-image"><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let src = each_array_1[i];
      Image($$payload2, {
        class: "about-hero-image",
        maxWidth: "1000",
        maxHeight: "500",
        quality: "1",
        alt: `About image ${i + 1}`,
        get src() {
          return src;
        },
        set src($$value) {
          src = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--></div> <div data-w-id="4a9df750-6189-3e52-952f-e359d7332b58" style="" class="grid-about-counter-center"><!--[-->`;
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let counter = each_array_2[i];
      Counter($$payload2, {
        firstEntry: i === 0,
        lastEntry: i === heroCounters.length - 1,
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
    $$payload2.out += `<!--]--></div></div></section> <section class="about-section-split section-spacing"><div class="w-layout-blockcontainer container-medium w-container"><div class="about-content-wrap"><h2>`;
    PlainText($$payload2, {
      get content() {
        return whoWeAre.title;
      },
      set content($$value) {
        whoWeAre.title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2> <div class="about-content">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return whoWeAre.content;
      },
      set content($$value) {
        whoWeAre.content = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="grid-about-split-feature">`;
    if (whoWeAre.featureItems && whoWeAre.featureItems.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_3 = ensure_array_like(whoWeAre.featureItems);
      $$payload2.out += `<!--[-->`;
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        let item = each_array_3[i];
        $$payload2.out += `<div><h3 class="about-split-feature-title">`;
        PlainText($$payload2, {
          get content() {
            return item.title;
          },
          set content($$value) {
            item.title = $$value;
            $$settled = false;
          }
        });
        $$payload2.out += `<!----></h3> <p class="no-margin">`;
        PlainText($$payload2, {
          get content() {
            return item.description;
          },
          set content($$value) {
            item.description = $$value;
            $$settled = false;
          }
        });
        $$payload2.out += `<!----></p> `;
        if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="flex mt-2 space-x-1"><button class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white" title="Delete item" aria-label="Delete feature item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? "opacity-20" : ""}`)} title="Move up" aria-label="Move feature item up"${attr("disabled", i === 0, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === whoWeAre.featureItems.length - 1 ? "opacity-20" : ""}`)} title="Move down" aria-label="Move feature item down"${attr("disabled", i === whoWeAre.featureItems.length - 1, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div><h3 class="about-split-feature-title">Our mission</h3> <p class="no-margin">Providing tailored visa and immigration solutions to help people achieve their global aspirations.</p></div> <div><h3 class="about-split-feature-title">Our vision</h3> <p class="no-margin">To be a trusted partner, guiding individuals and families toward a brighter future abroad.</p></div>`;
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-4 col-span-2"><button class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1">Add feature item</button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></div> <div class="vector-01 sm">`;
    Image($$payload2, {
      class: "vector-01-image",
      maxWidth: "628",
      maxHeight: "628",
      quality: "0.8",
      alt: "Vector background image",
      sizes: "(max-width: 628px) 100vw, 628px",
      get src() {
        return whoWeAre.vectorImage;
      },
      set src($$value) {
        whoWeAre.vectorImage = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></section> <section class="why-choose-section"><div class="w-layout-blockcontainer container w-container"><div data-w-id="57611c0e-ba1b-b15e-955d-6930d1f421bd" style="" class="section-title text-center"><h2>`;
    PlainText($$payload2, {
      get content() {
        return whyChooseUs.title;
      },
      set content($$value) {
        whyChooseUs.title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h2></div> <div data-w-id="57611c0e-ba1b-b15e-955d-6930d1f421c3" style="" class="grid-why-choose-two"><!--[-->`;
    for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
      let item = each_array_4[i];
      $$payload2.out += `<div class="why-choose-item">`;
      Image($$payload2, {
        src: item.icon,
        loading: "eager",
        alt: `Icon for ${item.title}`,
        class: "why-choose-icon",
        maxWidth: "64",
        maxHeight: "64"
      });
      $$payload2.out += `<!----> <div><h3 class="why-choose-title-two">`;
      PlainText($$payload2, {
        get content() {
          return item.title;
        },
        set content($$value) {
          item.title = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></h3> <p class="no-margin">`;
      PlainText($$payload2, {
        get content() {
          return item.description;
        },
        set content($$value) {
          item.description = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></p></div> `;
      if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex mt-2 space-x-1"><button class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white" title="Delete item" aria-label="Delete why choose us item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? "opacity-20" : ""}`)} title="Move up" aria-label="Move item up"${attr("disabled", i === 0, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button> <button${attr_class(`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === whyChooseUs.items.length - 1 ? "opacity-20" : ""}`)} title="Move down" aria-label="Move item down"${attr("disabled", i === whyChooseUs.items.length - 1, true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg></button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="text-center mt-4 col-span-3"><button class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1">Add item</button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></section> `;
    EditableWebsiteTeaser($$payload2, {
      get cta() {
        return cta;
      },
      set cta($$value) {
        cta = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Footer($$payload2, { counter: "/about" });
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
