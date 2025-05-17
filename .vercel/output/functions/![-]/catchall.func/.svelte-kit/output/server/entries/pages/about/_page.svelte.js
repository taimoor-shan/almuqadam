import { z as push, G as fallback, J as copy_payload, K as assign_payload, N as bind_props, C as pop, I as store_get, M as unsubscribe_stores, P as attr, T as store_set, S as ensure_array_like, U as head, F as escape_html } from "../../../chunks/index.js";
import { I as Image, P as PlainText } from "../../../chunks/EditorToolbar.js";
import { R as RichText } from "../../../chunks/RichText.js";
import "../../../chunks/util.js";
import { P as PrimaryButton } from "../../../chunks/PrimaryButton.js";
import { L as LoginMenu } from "../../../chunks/LoginMenu.js";
import { i as isEditing, c as currentUser, F as Footer } from "../../../chunks/WebsiteNav.js";
import { W as WebsiteHeader } from "../../../chunks/WebsiteHeader.js";
import { E as EditableWebsiteTeaser } from "../../../chunks/EditableWebsiteTeaser.js";
import { I as Icon } from "../../../chunks/Icon.js";
function WhyChooseItem($$payload, $$props) {
  push();
  var $$store_subs;
  let icon = fallback($$props["icon"], "");
  let title = fallback($$props["title"], "");
  let description = fallback($$props["description"], "");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="why-choose-item svelte-ropgrq">`;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="delete-button svelte-ropgrq">`;
      Icon($$payload2, {
        icon: "mdi:delete",
        width: "16",
        height: "16"
      });
      $$payload2.out += `<!----></button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Image($$payload2, {
      src: icon,
      loading: "eager",
      alt: title,
      class: "why-choose-icon",
      maxWidth: "64",
      maxHeight: "64",
      quality: "1"
    });
    $$payload2.out += `<!----> <div><h3 class="why-choose-title-two">`;
    PlainText($$payload2, {
      get content() {
        return title;
      },
      set content($$value) {
        title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h3> <p class="no-margin">`;
    PlainText($$payload2, {
      get content() {
        return description;
      },
      set content($$value) {
        description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { icon, title, description });
  pop();
}
function TeamMember($$payload, $$props) {
  push();
  var $$store_subs;
  let member = fallback(
    $$props["member"],
    () => ({
      name: "",
      position: "",
      bio: "",
      image: "",
      email: "",
      phone: ""
    }),
    true
  );
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="grid-agent-detail bg-accent"><div class="agent-detail-image-wrap">`;
    Image($$payload2, {
      loading: "eager",
      alt: member.name,
      class: "agent-image",
      maxWidth: "770",
      maxHeight: "770",
      quality: "1",
      get src() {
        return member.image;
      },
      set src($$value) {
        member.image = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="agent-detail-content-wrap svelte-4c2peu"><div class="cardHeader"><h4 class="agent-detail-title">`;
    PlainText($$payload2, {
      get content() {
        return member.name;
      },
      set content($$value) {
        member.name = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h4> <div class="text-primary-1">`;
    PlainText($$payload2, {
      get content() {
        return member.position;
      },
      set content($$value) {
        member.position = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div> <p class="agent-detail-description">`;
    PlainText($$payload2, {
      get content() {
        return member.bio;
      },
      set content($$value) {
        member.bio = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p> <div class="agent-detail-info-list"><a${attr("href", `mailto:${member.email}`)} class="agent-detail-contact-link">`;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      PlainText($$payload2, {
        get content() {
          return member.email;
        },
        set content($$value) {
          member.email = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      Icon($$payload2, {
        class: "",
        icon: "mdi:email-outline",
        width: "20",
        height: "20"
      });
    }
    $$payload2.out += `<!--]--></a> <a${attr("href", `tel:${member.phone}`)} class="agent-detail-contact-link">`;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      PlainText($$payload2, {
        get content() {
          return member.phone;
        },
        set content($$value) {
          member.phone = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      Icon($$payload2, {
        class: "",
        icon: "mdi:phone-outline",
        width: "20",
        height: "20"
      });
    }
    $$payload2.out += `<!--]--></a></div> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="delete-button svelte-4c2peu">`;
      Icon($$payload2, {
        icon: "mdi:delete",
        width: "16",
        height: "16"
      });
      $$payload2.out += `<!----></button>`;
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
  bind_props($$props, { member });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let title, subtitle, aboutContent, teamMembers, missionStatement, visionStatement, heroImage, heroImage2, showUserMenu, cta, whyChooseItems;
  function initOrReset() {
    store_set(currentUser, data.currentUser);
    title = data.page?.title || "About Almuqadam";
    subtitle = data.page?.subtitle || "Your Trusted Visa Consultancy Partner";
    aboutContent = data.page?.aboutContent || `<p>Almuqadam is a premier visa consultancy service based in the UK, dedicated to helping clients navigate the complex world of international travel documentation. With years of experience and a commitment to excellence, we provide personalized visa solutions for individuals, families, and businesses.</p>
      <p>Our team of experts understands the nuances of visa applications for various countries and stays up-to-date with the latest immigration policies and requirements. We take pride in our high success rate and the trust our clients place in us.</p>`;
    teamMembers = JSON.parse(JSON.stringify(data.page?.teamMembers || [
      {
        name: "John Smith",
        position: "Founder & CEO",
        bio: "With over 15 years of experience in immigration consulting, John leads our team with expertise and passion.",
        image: "/images/person-placeholder.jpg",
        email: "john@almuqadam.com",
        phone: "+(251) 854-6308"
      },
      {
        name: "Maria Gonzales",
        position: "Family Visa Specialist",
        bio: "Maria is dedicated to reuniting families by providing expert assistance with family sponsorship visas.",
        image: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/6780bca5585654292b078021_agent-03.avif",
        email: "maria@almuqadam.com",
        phone: "+(251) 854-6308"
      }
    ]));
    missionStatement = data.page?.missionStatement || "Our mission is to make international travel accessible to everyone by providing expert visa guidance and support throughout the application process.";
    visionStatement = data.page?.visionStatement || "We envision a world where borders are no obstacle to exploration, education, and business opportunities.";
    heroImage = data.page?.heroImage || "/images/ch_hero.jpeg";
    heroImage2 = data.page?.heroImage2 || "/images/ch_hero.jpeg";
    cta = data.globalData?.cta;
    whyChooseItems = JSON.parse(JSON.stringify(data.page?.whyChooseItems || [
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
    ]));
    store_set(isEditing, false);
  }
  initOrReset();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(whyChooseItems);
    const each_array_1 = ensure_array_like(teamMembers);
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>${escape_html(title)} | Almuqadam - Explore Beyond the boundries</title>`;
      $$payload3.out += `<meta name="description" content="Learn about Almuqadam, your trusted visa consultancy partner. Discover our mission, vision, and the team behind our successful visa services.">`;
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
    $$payload2.out += `<!----> <section class="about-hero-section"><div class="w-layout-blockcontainer container w-container"><div class="hero-content-center space-y-8"><h1 class="about-hero-title">`;
    PlainText($$payload2, {
      get content() {
        return title;
      },
      set content($$value) {
        title = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></h1> <p class="lg:w-3/4 mx-auto">`;
    PlainText($$payload2, {
      get content() {
        return subtitle;
      },
      set content($$value) {
        subtitle = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></p> <a href="/contact" class="button-gradient w-button">Start your journey</a></div> <div class="grid-about-hero-image">`;
    Image($$payload2, {
      class: "about-hero-image d-none md:block",
      maxWidth: "1000",
      maxHeight: "500",
      quality: "1",
      alt: "About Almuqadam hero image",
      get src() {
        return heroImage;
      },
      set src($$value) {
        heroImage = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Image($$payload2, {
      class: "about-hero-image",
      maxWidth: "500",
      maxHeight: "500",
      quality: "1",
      alt: "About Almuqadam hero image",
      get src() {
        return heroImage2;
      },
      set src($$value) {
        heroImage2 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></section> <section class="about-section-split section-spacing"><div class="w-layout-blockcontainer container-medium w-container"><div class="about-content-wrap"><h2>Who we are</h2> <div class="about-content">`;
    RichText($$payload2, {
      multiLine: true,
      get content() {
        return aboutContent;
      },
      set content($$value) {
        aboutContent = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="grid-about-split-feature"><div><h5 class="about-split-feature-title">Our Mission</h5> `;
    PlainText($$payload2, {
      get content() {
        return missionStatement;
      },
      set content($$value) {
        missionStatement = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div><h5 class="about-split-feature-title">Our Vision</h5> `;
    PlainText($$payload2, {
      get content() {
        return visionStatement;
      },
      set content($$value) {
        visionStatement = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div></div> <div class="vector-01 sm"><img src="/images/vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image"></div></section> <section class="why-choose-section"><div class="w-layout-blockcontainer container w-container"><div class="section-title text-center"><h2>Why <span class="heading-serif">choose</span> us</h2></div> <div class="grid-why-choose-two"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let item = each_array[index];
      WhyChooseItem($$payload2, {
        get icon() {
          return item.icon;
        },
        set icon($$value) {
          item.icon = $$value;
          $$settled = false;
        },
        get title() {
          return item.title;
        },
        set title($$value) {
          item.title = $$value;
          $$settled = false;
        },
        get description() {
          return item.description;
        },
        set description($$value) {
          item.description = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="add-item-button svelte-pcl8rb">`;
      Icon($$payload2, { icon: "mdi:plus", width: "24", height: "24" });
      $$payload2.out += `<!----> Add Feature</button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></section> <section class="section-spacing pb-0"><div class="w-layout-blockcontainer container w-container"><div class="section-title text-center mb-12"><h2>Our Team</h2> <p class="text-xl mt-4">Meet the experts behind our successful visa services</p></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`;
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      let member = each_array_1[index];
      TeamMember($$payload2, {
        get member() {
          return member;
        },
        set member($$value) {
          member = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (store_get($$store_subs ??= {}, "$isEditing", isEditing)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="add-team-member-button svelte-pcl8rb">`;
      Icon($$payload2, { icon: "mdi:plus", width: "24", height: "24" });
      $$payload2.out += `<!----> Add Team Member</button>`;
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
