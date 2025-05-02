<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import Counter from '$lib/components/Counter.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Image from '$lib/components/Image.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;

  // --------------------------------------------------------------------------
  // DEFAULT PAGE CONTENT - ADJUST TO YOUR NEEDS
  // --------------------------------------------------------------------------
  const EMAIL = 'michael@letsken.com';

  // Can contain spaces but must not contain the + sign
  const PHONE_NUMBER = '43 664 1533015';

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
      name: 'John Smith',
      title: 'Immigration Consultant',
      bio: 'John has over 15 years of experience in immigration law and has helped hundreds of families successfully navigate the immigration process.',
      image: '/images/person-placeholder.jpg'
    },
    {
      name: 'Sarah Johnson',
      title: 'Legal Advisor',
      bio: 'Sarah specializes in complex immigration cases and brings a wealth of knowledge in international law to our team.',
      image: '/images/person-placeholder.jpg'
    }
  ];

  const WHO_WE_ARE_PLACEHOLDER = {
    title: 'Who we are',
    content: `
      <p>We are a dedicated visa and immigration agency committed to helping individuals and families achieve their dreams of living, working, and studying abroad. With years of experience and a team of experts, we simplify the complexities of immigration processes to ensure a smooth and successful journey for our clients.</p>`,
    featureItems: [
      {
        title: 'Our mission',
        description: 'Providing tailored visa and immigration solutions to help people achieve their global aspirations.'
      },
      {
        title: 'Our vision',
        description: 'To be a trusted partner, guiding individuals and families toward a brighter future abroad.'
      }
    ],
    vectorImage: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector.avif'
  };

  const FEATURES_PLACEHOLDER = [
    {
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg',
      text: 'Expert team'
    },
    {
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg',
      text: 'High approval rates'
    },
    {
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg',
      text: 'Fast and reliable service'
    }
  ];

  const HERO_COUNTERS_PLACEHOLDER = [
    {
      value: '10',
      suffix: 'K+',
      description: 'Achieving their global goals'
    },
    {
      value: '98',
      suffix: '%',
      description: 'Successful visa outcomes'
    },
    {
      value: '18',
      suffix: '+',
      description: 'Expert guidance'
    },
    {
      value: '15',
      suffix: '+',
      description: 'Visa services'
    }
  ];

  const WHY_CHOOSE_US_PLACEHOLDER = {
    title: 'Why choose us',
    items: [
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f1eb128761b662609_icon-15.svg',
        title: '24/7 Support',
        description: 'Our team is available around the clock to assist you.'
      },
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e2037b52b05c1c0850d_icon-14.svg',
        title: 'Personalized solutions',
        description: 'Every case is unique, and we tailor our services to meet your specific needs.'
      },
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f308938b15683f7f8_icon-16.svg',
        title: 'Transparent process',
        description: 'Clear communication and guidance at every step.'
      }
    ]
  };

  let pageTitle,
    pageSubtitle,
    aboutContent,
    teamMembers,
    heroTitle,
    heroSpanText,
    features,
    heroCounters,
    heroImages,
    aboutImage,
    whoWeAre,
    whyChooseUs,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    pageTitle = data.page?.pageTitle || 'About Naseer UK';
    pageSubtitle = data.page?.pageSubtitle || 'Your Trusted Partner in Immigration Services';
    aboutContent = data.page?.aboutContent || ABOUT_CONTENT_PLACEHOLDER;
    aboutImage = data.page?.aboutImage || '/images/about-image.jpg';

    // Hero section content
    heroTitle = data.page?.heroTitle || 'Simplifying your';
    heroSpanText = data.page?.heroSpanText || 'immigration';

    // Make deep copies
    teamMembers = JSON.parse(JSON.stringify(data.page?.teamMembers || TEAM_MEMBERS_PLACEHOLDER));
    features = JSON.parse(JSON.stringify(data.page?.features || FEATURES_PLACEHOLDER));
    heroCounters = JSON.parse(JSON.stringify(data.page?.heroCounters || HERO_COUNTERS_PLACEHOLDER));

    // Hero images
    heroImages = data.page?.heroImages || [
      'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/678dedda5bfb461092e80c48_about-image-06.avif',
      'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/678dedda83dfb748c537b207_about-image-04.avif'
    ];

    // Who we are section
    whoWeAre = JSON.parse(JSON.stringify(data.page?.whoWeAre || WHO_WE_ARE_PLACEHOLDER));

    // Ensure featureItems exists (for backward compatibility)
    if (!whoWeAre.featureItems) {
      whoWeAre.featureItems = [
        {
          title: 'Our mission',
          description: 'Providing tailored visa and immigration solutions to help people achieve their global aspirations.'
        },
        {
          title: 'Our vision',
          description: 'To be a trusted partner, guiding individuals and families toward a brighter future abroad.'
        }
      ];
    }

    // Why choose us section
    whyChooseUs = JSON.parse(JSON.stringify(data.page?.whyChooseUs || WHY_CHOOSE_US_PLACEHOLDER));

    $isEditing = false;
  }

  // --------------------------------------------------------------------------
  // Page logic
  // --------------------------------------------------------------------------

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  function addTeamMember() {
    teamMembers.push({
      name: 'New Team Member',
      title: 'Position Title',
      bio: 'Add a short bio here.',
      image: '/images/person-placeholder.jpg'
    });
    teamMembers = teamMembers; // trigger update
  }

  function deleteTeamMember(index) {
    teamMembers.splice(index, 1);
    teamMembers = teamMembers; // trigger update
  }

  function moveTeamMember(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < teamMembers.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = teamMembers.splice(index, 1)[0];
    // Insert at new position
    teamMembers.splice(toIndex, 0, element);
    teamMembers = teamMembers; // trigger update
  }

  // Feature list functions
  function addFeature() {
    features.push({
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67791f67a9346f4da95ddd0a_icon-10.svg',
      text: 'New feature'
    });
    features = features; // trigger update
  }

  function deleteFeature(index) {
    features.splice(index, 1);
    features = features; // trigger update
  }

  function moveFeature(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < features.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = features.splice(index, 1)[0];
    // Insert at new position
    features.splice(toIndex, 0, element);
    features = features; // trigger update
  }

  // Hero counter functions
  function addHeroCounter() {
    heroCounters.push({
      value: '0',
      suffix: '+',
      description: 'Add counter description here'
    });
    heroCounters = heroCounters; // trigger update
  }

  function deleteHeroCounter(index) {
    heroCounters.splice(index, 1);
    heroCounters = heroCounters; // trigger update
  }

  function moveHeroCounter(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < heroCounters.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = heroCounters.splice(index, 1)[0];
    // Insert at new position
    heroCounters.splice(toIndex, 0, element);
    heroCounters = heroCounters; // trigger update
  }

  // Feature item functions for the Who We Are section
  function addFeatureItem() {
    // Ensure featureItems exists
    if (!whoWeAre.featureItems) {
      whoWeAre.featureItems = [];
    }

    whoWeAre.featureItems.push({
      title: 'New Feature',
      description: 'Add description here'
    });
    whoWeAre = {...whoWeAre}; // trigger update
  }

  function deleteFeatureItem(index) {
    if (whoWeAre.featureItems && whoWeAre.featureItems.length > index) {
      whoWeAre.featureItems.splice(index, 1);
      whoWeAre = {...whoWeAre}; // trigger update
    }
  }

  function moveFeatureItem(index, direction) {
    if (!whoWeAre.featureItems || whoWeAre.featureItems.length <= 1) {
      return; // Nothing to move
    }

    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < whoWeAre.featureItems.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }

    // Remove item from original position
    const element = whoWeAre.featureItems.splice(index, 1)[0];
    // Insert at new position
    whoWeAre.featureItems.splice(toIndex, 0, element);
    whoWeAre = {...whoWeAre}; // trigger update
  }

  // Why Choose Us functions
  function addWhyChooseItem() {
    whyChooseUs.items.push({
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f1eb128761b662609_icon-15.svg',
      title: 'New Feature',
      description: 'Add description here'
    });
    whyChooseUs = {...whyChooseUs}; // trigger update
  }

  function deleteWhyChooseItem(index) {
    if (whyChooseUs.items && whyChooseUs.items.length > index) {
      whyChooseUs.items.splice(index, 1);
      whyChooseUs = {...whyChooseUs}; // trigger update
    }
  }

  function moveWhyChooseItem(index, direction) {
    if (!whyChooseUs.items || whyChooseUs.items.length <= 1) {
      return; // Nothing to move
    }

    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < whyChooseUs.items.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }

    // Remove item from original position
    const element = whyChooseUs.items.splice(index, 1)[0];
    // Insert at new position
    whyChooseUs.items.splice(toIndex, 0, element);
    whyChooseUs = {...whyChooseUs}; // trigger update
  }

  async function savePage() {
    try {
      // Only persist the page when logged in as an admin
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'about',
          page: {
            pageTitle,
            pageSubtitle,
            aboutContent,
            teamMembers,
            aboutImage,
            heroTitle,
            heroSpanText,
            features,
            heroCounters,
            heroImages,
            whoWeAre,
            whyChooseUs
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
  <title>{pageTitle} - Naseer UK</title>
  <meta name="description" content="Learn more about our immigration services and our team." />
  <link rel="canonical" href="https://naseeruk.com/about" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<!-- Hero -->
<section class="about-hero-section">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="703bbe20-6d1e-7f1e-e9df-87bf43072045" style="" class="hero-content-center">
      <h1 class="about-hero-title">
        <PlainText bind:content={heroTitle} />
        <span class="heading-serif"><PlainText bind:content={heroSpanText} /></span>
        journey with us
      </h1>
      <div class="about-feature-list">
        {#each features as feature, i}
          <div class="about-feature-list-item">
            <img src={feature.icon} loading="eager" class="about-feature-list-icon" alt={`Feature icon for ${feature.text}`} />
            <div>
              <PlainText bind:content={feature.text} />
            </div>

            {#if $isEditing}
              <div class="flex ml-2 space-x-1">
                <button
                  class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                  on:click={() => deleteFeature(i)}
                  title="Delete feature"
                  aria-label="Delete feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? 'opacity-20' : ''}`}
                  on:click={() => moveFeature(i, 'up')}
                  title="Move up"
                  aria-label="Move feature up"
                  disabled={i === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <button
                  class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === features.length - 1 ? 'opacity-20' : ''}`}
                  on:click={() => moveFeature(i, 'down')}
                  title="Move down"
                  aria-label="Move feature down"
                  disabled={i === features.length - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            {/if}
          </div>
        {/each}

        {#if $isEditing}
          <div class="text-center mt-2">
            <button
              class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
              on:click={addFeature}
            >
              Add feature
            </button>
          </div>
        {/if}
      </div>
      <a href="contact.html" class="button-gradient w-button">Start your journey</a>
    </div>

    <div data-w-id="0cbb155b-4be4-4f7d-28cc-eb1e82b3aaf1" style="" class="grid-about-hero-image">
      {#each heroImages as src, i}
        <Image
          class="about-hero-image"
          maxWidth="1000"
          maxHeight="500"
          quality="1"
          bind:src
          alt={`About image ${i+1}`}
        />
      {/each}
    </div>

    <div data-w-id="4a9df750-6189-3e52-952f-e359d7332b58" style="" class="grid-about-counter-center">
      {#each heroCounters as counter, i}
        <Counter
          bind:counter
          firstEntry={i === 0}
          lastEntry={i === heroCounters.length - 1}
          on:delete={() => deleteHeroCounter(i)}
          on:up={() => moveHeroCounter(i, 'up')}
          on:down={() => moveHeroCounter(i, 'down')}
        />
      {/each}

      {#if $isEditing}
        <div class="text-center mt-4">
          <SecondaryButton on:click={addHeroCounter}>Add counter</SecondaryButton>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- who we are -->
<section class="about-section-split section-spacing">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div class="about-content-wrap">
      <h2><PlainText bind:content={whoWeAre.title} /></h2>
      <div class="about-content">
        <RichText multiLine bind:content={whoWeAre.content} />
      </div>

      <div class="grid-about-split-feature">
        {#if whoWeAre.featureItems && whoWeAre.featureItems.length > 0}
          {#each whoWeAre.featureItems as item, i}
            <div>
              <h3 class="about-split-feature-title">
                <PlainText bind:content={item.title} />
              </h3>
              <p class="no-margin">
                <PlainText bind:content={item.description} />
              </p>

              {#if $isEditing}
                <div class="flex mt-2 space-x-1">
                  <button
                    class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                    on:click={() => deleteFeatureItem(i)}
                    title="Delete item"
                    aria-label="Delete feature item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? 'opacity-20' : ''}`}
                    on:click={() => moveFeatureItem(i, 'up')}
                    title="Move up"
                    aria-label="Move feature item up"
                    disabled={i === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button
                    class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === whoWeAre.featureItems.length - 1 ? 'opacity-20' : ''}`}
                    on:click={() => moveFeatureItem(i, 'down')}
                    title="Move down"
                    aria-label="Move feature item down"
                    disabled={i === whoWeAre.featureItems.length - 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        {:else}
          <!-- Fallback for when featureItems is not available -->
          <div>
            <h3 class="about-split-feature-title">Our mission</h3>
            <p class="no-margin">Providing tailored visa and immigration solutions to help people achieve their global aspirations.</p>
          </div>
          <div>
            <h3 class="about-split-feature-title">Our vision</h3>
            <p class="no-margin">To be a trusted partner, guiding individuals and families toward a brighter future abroad.</p>
          </div>
        {/if}

        {#if $isEditing}
          <div class="text-center mt-4 col-span-2">
            <button
              class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
              on:click={addFeatureItem}
            >
              Add feature item
            </button>
          </div>
        {/if}
      </div>

    </div>
  </div>
  <div class="vector-01 sm">
    <Image
      class="vector-01-image"
      maxWidth="628"
      maxHeight="628"
      quality="0.8"
      bind:src={whoWeAre.vectorImage}
      alt="Vector background image"
      sizes="(max-width: 628px) 100vw, 628px"
    />
  </div>
</section>

<!-- Why Choose Us -->
<section class="why-choose-section">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="57611c0e-ba1b-b15e-955d-6930d1f421bd" style="" class="section-title text-center">
      <h2><PlainText bind:content={whyChooseUs.title} /></h2>
    </div>
    <div data-w-id="57611c0e-ba1b-b15e-955d-6930d1f421c3" style="" class="grid-why-choose-two">
      {#each whyChooseUs.items as item, i}
        <div class="why-choose-item">
          <Image
            src={item.icon}
            loading="eager"
            alt={`Icon for ${item.title}`}
            class="why-choose-icon"
            maxWidth="64"
            maxHeight="64"
          />
          <div>
            <h3 class="why-choose-title-two"><PlainText bind:content={item.title} /></h3>
            <p class="no-margin"><PlainText bind:content={item.description} /></p>
          </div>

          {#if $isEditing}
            <div class="flex mt-2 space-x-1">
              <button
                class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                on:click={() => deleteWhyChooseItem(i)}
                title="Delete item"
                aria-label="Delete why choose us item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? 'opacity-20' : ''}`}
                on:click={() => moveWhyChooseItem(i, 'up')}
                title="Move up"
                aria-label="Move item up"
                disabled={i === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button
                class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === whyChooseUs.items.length - 1 ? 'opacity-20' : ''}`}
                on:click={() => moveWhyChooseItem(i, 'down')}
                title="Move down"
                aria-label="Move item down"
                disabled={i === whyChooseUs.items.length - 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          {/if}
        </div>
      {/each}

      {#if $isEditing}
        <div class="text-center mt-4 col-span-3">
          <button
            class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
            on:click={addWhyChooseItem}
          >
            Add item
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>

<Footer counter="/about" />
