<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import Counter from '$lib/components/Counter.svelte';
  import IntroStep from '$lib/components/IntroStep.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Image from '$lib/components/Image.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import RunesCounter from '$lib/components/RunesCounter.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;

  // --------------------------------------------------------------------------
  // DEFAULT PAGE CONTENT - AJDUST TO YOUR NEEDS
  // --------------------------------------------------------------------------
  const EMAIL = 'michael@letsken.com';

  // Can contain spaces but must not contain the + sign
  const PHONE_NUMBER = '43 664 1533015';

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
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”',
      image: '/images/person-placeholder.jpg',
      name: 'Jane Doe · jane-doe.org'
    }
  ];

  const COUNTERS_PLACEHOLDER = [
    {
      value: '10',
      suffix: 'K+',
      description: 'Assisting thousands of clients in achieving their global goals.'
    },
    {
      value: '98',
      suffix: '%',
      description: 'Consistently achieving successful visa outcomes.'
    },
    {
      value: '18',
      suffix: '+',
      description: 'Expert guidance throughout your immigration journey.'
    }
  ];

  let title,
    subtitle,
    aboutBlurb,
    testimonials,
    counters,
    faqs,
    introStep1,
    introStep2,
    introStep3,
    introStep4,
    bioTitle,
    bioPicture,
    bio,
    heroImage,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'Untitled Website';
    subtitle = data.page?.subtitle || 'Building bridges for your global future';
    aboutBlurb = data.page?.aboutBlurb || 'We are dedicated to helping individuals and families navigate the complex world of visas and immigration with ease. With years of experience and a commitment to personalized service, our team of experts provides end-to-end support, from initial consultation to visa approval.';
    faqs = data.page?.faqs || FAQS_PLACEHOLDER;

    // Make a deep copy
    testimonials = JSON.parse(JSON.stringify(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER));
    counters = JSON.parse(JSON.stringify(data.page?.counters || COUNTERS_PLACEHOLDER));

    introStep1 = JSON.parse(
      JSON.stringify(
        data.page?.introStep1 || {
          label: 'THE PROBLEM',
          title: 'The problem statement',
          description: 'Describe the problem you are solving in a short sentence.'
        }
      )
    );
    introStep2 = JSON.parse(
      JSON.stringify(
        data.page?.introStep2 || {
          label: 'THE DREAM',
          title: 'This is how it should be.',
          description: 'Describe why it should be like that.'
        }
      )
    );
    introStep3 = JSON.parse(
      JSON.stringify(
        data.page?.introStep3 || {
          label: 'THE REALITY',
          title: 'A statement why it is not that easy.',
          description: 'Describe the reality a bit more.'
        }
      )
    );
    introStep4 = JSON.parse(
      JSON.stringify(
        data.page?.introStep4 || {
          label: 'THE PROMISE',
          title: 'Still the solution is worth it.',
          description: 'And why this is, should be described here.'
        }
      )
    );
    heroImage = data.page?.heroImage || '/images/ch_hero.jpeg';

    bioPicture = data.page?.bioPicture || '/images/person-placeholder.jpg';
    bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    $isEditing = false;
  }

  // --------------------------------------------------------------------------
  // Page logic
  // --------------------------------------------------------------------------

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  function addTestimonial() {
    testimonials.push({
      text: '“Add a quote text here”',
      image: '/images/person-placeholder.jpg',
      name: 'Firstname Lastname · example.com'
    });
    testimonials = testimonials; // trigger update
  }

  function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    testimonials = testimonials; // trigger update
  }

  function moveTestimonial(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < testimonials.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = testimonials.splice(index, 1)[0];
    // Insert at new position
    testimonials.splice(toIndex, 0, element);
    testimonials = testimonials; // trigger update
  }

  function addCounter() {
    counters.push({
      value: '0',
      suffix: '+',
      description: 'Add counter description here'
    });
    counters = counters; // trigger update
  }

  function deleteCounter(index) {
    counters.splice(index, 1);
    counters = counters; // trigger update
  }

  function moveCounter(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < counters.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = counters.splice(index, 1)[0];
    // Insert at new position
    counters.splice(toIndex, 0, element);
    counters = counters; // trigger update
  }

  async function savePage() {
    try {
      // Only persist the start page when logged in as an admin
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'home',
          page: {
            title,
            subtitle,
            aboutBlurb,
            faqs,
            testimonials,
            counters,
            introStep1,
            introStep2,
            introStep3,
            introStep4,
            bioPicture,
            bioTitle,
            bio,
            heroImage
          }
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  initOrReset();
</script>

<svelte:head>
  <title>Make your website editable</title>
  <meta name="description" content="Make changes to your website while browsing it." />
  <link rel="alternate" hreflang="en" href="https://editable.website" />
  <link rel="canonical" href="https://editable.website" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>
<!-- Hero -->
<section data-w-id="3089b8af-5f0f-4ac4-5520-f107362feacf" class="hero-section">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div  class="hero-content-center">
      <h1 class="hero-title-center"> <PlainText bind:content={title} /></h1>
      <p><PlainText bind:content={subtitle} /></p>
      <div class="hero-button-list"><a href="immigration.html" class="button-gradient w-button">Immigration services</a><a href="contact.html" class="button-secondary-2-outline w-inline-block"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ce50f6ef7ca3e10af73f_icon-03.svg" loading="eager" alt="Icon 03" class="button-icon" />
          <div>Schedule a free call</div>
        </a></div>
    </div>
  </div>
  <div class="hero-image-wrap">
    <Image
      class="hero-image"
      maxWidth="1920"
      maxHeight="1080"
      quality="1"
      bind:src={heroImage}
      alt="Hero image"
    />
  </div>
  <div class="hero-blur gradient-2"></div>
  <div class="hero-blur-divider"></div>
</section>
<!-- about -->
<section class="about-section section-spacing-bottom">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="89d3ec49-ae5a-0e45-9769-846ab7ffba8e"  class="about-content-right">
      <div>
        <h2 class="about-title-right"><PlainText bind:content={aboutBlurb} /></h2><a href="about.html" class="button-gradient w-button">Know more about us</a>
      </div>
      <div class="grid-about-counter">
        {#each counters as counter, i}
          <Counter
            bind:counter
            firstEntry={i === 0}
            lastEntry={i === counters.length - 1}
            on:delete={() => deleteCounter(i)}
            on:up={() => moveCounter(i, 'up')}
            on:down={() => moveCounter(i, 'down')}
          />
        {/each}

        {#if $isEditing}
          <div class="text-center mt-4">
            <SecondaryButton on:click={addCounter}>Add counter</SecondaryButton>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div data-w-id="1bf37b48-b442-9317-453e-3e872ec208bd" class="vector-01"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image" /></div>
</section>

<!-- <div>
  <div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
    <NotEditable>
      <svg
        class="pb-8 w-14 sm:w-24 mx-auto"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M164 110L64 163.768V200L164 147.059V110Z" fill="#111827" />
        <path d="M136 66L36 119.768V156L136 103.059V66Z" fill="#111827" />
        <path d="M164 0L64 53.7684V90L164 37.0588V0Z" fill="#111827" />
      </svg>
    </NotEditable>
    <NotEditable>
      <div class="text-center pt-8 pb-4 bounce text-xl">↓</div>
      <div class="text-center">
        <PrimaryButton size="lg" type="button" on:click={toggleEdit}>Edit</PrimaryButton>
      </div>
    </NotEditable>
  </div>
</div> -->

<div class="pt-12 md:pt-24 border-gray-100 border-b-2">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="relative">
      <div class="w-1 bg-gray-900 absolute inset-0 -top-8 bottom-12 mx-auto z-0">
        <div class="w-4 h-4 rounded-full bg-gray-900 absolute -top-1 -left-[6px]"></div>
      </div>
      <div class="z-10">
        <IntroStep bind:intro={introStep1} />
        <IntroStep bind:intro={introStep2} />
        <IntroStep bind:intro={introStep3} />
        <IntroStep bind:intro={introStep4} />
      </div>
    </div>
    <div class="relative h-14">
      <div class="w-1 bg-gray-900 absolute inset-0 -top-16 bottom-12 mx-auto z-0">
        <div
          class="absolute -bottom-2 -left-[7px] h-0 w-0 border-x-[9px] border-x-transparent border-t-[10px] border-gray-900"
        ></div>
      </div>
    </div>
    <div class="text-center mb-32">
      <PrimaryButton
        size="lg"
        type="button"
        on:click={() =>
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >Create an editable website</PrimaryButton
      >
    </div>
  </div>
</div>

<div class="bg-white pb-6 sm:pb-12">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="font-bold text-sm sm:text-base py-12 sm:pt-24 pb-8">WHAT PEOPLE SAY</div>
  </div>
  {#each testimonials as testimonial, i}
    <Testimonial
      bind:testimonial
      firstEntry={i === 0}
      lastEntry={i === testimonials.length - 1}
      on:delete={() => deleteTestimonial(i)}
      on:up={() => moveTestimonial(i, 'up')}
      on:down={() => moveTestimonial(i, 'down')}
    />
  {/each}

  {#if $isEditing}
    <div class="text-center pb-12 border-b border-gray-100">
      <SecondaryButton on:click={addTestimonial}>Add testimonial</SecondaryButton>
    </div>
  {/if}
</div>

{#if data.articles.length > 0}
  <NotEditable>
    <div class="bg-white border-t-2 border-gray-100 pb-10 sm:pb-16">
      <div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
        <div class="font-bold text-sm sm:text-base">FROM THE BLOG</div>
      </div>
      {#each data.articles as article, i}
        <ArticleTeaser {article} firstEntry={i === 0} />
      {/each}
    </div>
  </NotEditable>
{/if}

<!-- Bio -->
<div id="contact" class="bg-white border-t-2 border-b-2 border-gray-100 pb-12 sm:pb-24">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="pt-12 sm:pt-24 pb-12 text-center">
      <div class="w-48 h-48 md:w-72 md:h-72 mx-auto overflow-hidden relative rounded-full">
        <Image
          class="block w-48 h-48 md:w-72 md:h-72 rounded-full"
          maxWidth="384"
          maxHeight="384"
          quality="0.8"
          bind:src={bioPicture}
          alt="Michael Aufreiter"
        />
      </div>

    </div>
    <div class="">
      <h1 class="text-3xl md:text-5xl font-bold">
        <PlainText bind:content={bioTitle} />
      </h1>
    </div>
    <div class="prose md:prose-xl pb-6">
      <RichText multiLine bind:content={bio} />
    </div>

    <NotEditable>
      <div class="flex flex-col sm:flex-row sm:space-x-6 md:space-x-8 space-y-4 sm:space-y-0">
        <PrimaryButton size="lg" href={`mailto:${EMAIL}`}>Email</PrimaryButton>
        <SecondaryButton size="lg" href={`https://wa.me/${PHONE_NUMBER.replace(/\s+/g, '')}`}>
          WhatsApp (+{PHONE_NUMBER})
        </SecondaryButton>
      </div>
    </NotEditable>
  </div>
</div>

<!-- FAQs -->
<div class="bg-white">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="font-bold text-sm sm:text-base pt-12 sm:pt-24 -mb-6 md:-mb-12">FAQs</div>
    <div class="prose md:prose-xl pb-12 sm:pb-24">
      <RichText multiLine bind:content={faqs} />
    </div>
  </div>
</div>


<Footer counter="/" />
