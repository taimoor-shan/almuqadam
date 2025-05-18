<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Image from '$lib/components/Image.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import EditableVisaService from '$lib/components/EditableVisaService.svelte';
  import EditableVisaServices from '$lib/components/EditableVisaServices.svelte';
  import EditableAccordion from '$lib/components/EditableAccordion.svelte';
  import Icon from '@iconify/svelte';

  export let data;

  // Default content
  let title, subtitle, visaIntro, visaServices, heroImage, showUserMenu, cta, faqs;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'Our Visa Services';
    subtitle = data.page?.subtitle || 'Expert guidance for your international travel needs';
    visaIntro = data.page?.visaIntro ||
      `<p>At Almuqadam, we specialize in providing comprehensive visa services to help you travel with confidence. Our team of experienced consultants will guide you through every step of the application process, ensuring that your documentation is complete and accurate.</p>
      <p>We offer a range of visa services tailored to your specific needs, whether you're traveling for tourism, business, education, or family visits.</p>`;
    visaServices = data.page?.visaServices || [
      {
        title: 'UK Visit Visa',
        description: 'Standard Visitor visa for tourism, business visits, or visiting family and friends in the UK.',
        icon: 'carbon:location',
        features: ['Up to 6 months stay', 'Multiple entry options', 'Fast processing available']
      },
      {
        title: 'Schengen Visa',
        description: 'Travel to multiple European countries with a single visa application.',
        icon: 'carbon:earth-europe-africa',
        features: ['Access to 26 European countries', 'Short-stay visits', 'Tourism and business purposes']
      },
      {
        title: 'USA Visitor Visa',
        description: 'B1/B2 visas for temporary travel to the United States for business or pleasure.',
        icon: 'carbon:location-current',
        features: ['Multiple entry options', 'Valid for up to 10 years', 'Tourism and business purposes']
      },
      {
        title: 'Canada Visitor Visa',
        description: 'Temporary Resident Visa for visiting Canada for tourism or business purposes.',
        icon: 'carbon:map',
        features: ['Single or multiple entry', 'Valid for up to 10 years', 'Fast processing options']
      }
    ];
    faqs = data.page?.faqs ||
      `<h2>What documents do I need for a visa application?</h2>
      <p>Required documents typically include a valid passport, completed application form, passport-sized photos, proof of travel insurance, flight itinerary, accommodation details, proof of financial means, and a cover letter. Specific requirements vary by country and visa type.</p>
      <h2>How long does the visa application process take?</h2>
      <p>Processing times vary by country and visa type, ranging from a few days to several weeks. We recommend applying at least 4-6 weeks before your planned travel date.</p>
      <h2>What is your success rate for visa applications?</h2>
      <p>We maintain a high success rate of over 95% for visa applications. Our expertise in preparing thorough applications significantly increases approval chances.</p>`;
    heroImage = data.page?.heroImage || '/images/ch_hero.jpeg';
    cta = data.globalData?.cta;
    $isEditing = false;
  }

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  // Reference to the accordion component
  let accordionComponent;

  async function savePage() {
    try {
      if ($currentUser) {
        // If we have an accordion component reference, get the HTML from it
        if (accordionComponent) {
          faqs = accordionComponent.itemsToHtml();
        }

        await fetchJSON('POST', '/api/save-page', {
          pageId: 'visas',
          page: {
            title,
            subtitle,
            visaIntro,
            visaServices,
            faqs,
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

  // Initialize page data
  initOrReset();
</script>

<svelte:head>
  <title>{title} | Almuqadam - Explore Beyond the boundries</title>
  <meta
    name="description"
    content="Explore our comprehensive visa services for UK, Schengen, USA, and more. Expert guidance and high success rates for all your travel documentation needs."
  />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<!-- Hero Section -->
<section class="hero-section">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div class="hero-content-center">
      <h1 class="hero-title-center"><PlainText bind:content={title} /></h1>
      <p><PlainText bind:content={subtitle} /></p>
      <div class="hero-button-list">
        <a href="#contactSec" class="button-gradient w-button">Free Visa Assessment</a>
      </div>
    </div>
  </div>
  <div class="hero-image-wrap">
    <Image
      class="hero-image"
      maxWidth="1920"
      maxHeight="1080"
      quality="1"
      bind:src={heroImage}
      alt="Visa services hero image"
    />
  </div>
  <div class="hero-blur gradient-2"></div>
  <div class="hero-blur-divider"></div>
</section>

<!-- Visa Introduction Section -->
<section class="section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div class="visa-intro">
      <div class="prose md:prose-xl">
        <RichText multiLine bind:content={visaIntro} />
      </div>
    </div>
  </div>
</section>

<!-- Visa Services Section -->
<section class="section-spacing bg-gray-100">
  <div class="w-layout-blockcontainer container w-container">
    <div class="section-title text-center mb-12">
      <h2>Our Services</h2>
      <p class="text-xl mt-4">Comprehensive visa solutions for your travel needs</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each visaServices as service, i}
        <div class="visa-service-card p-6 bg-white rounded-lg shadow-md">
          <div class="flex items-center mb-4">
            <div class="service-icon mr-4 text-blue-600">
              <Icon icon={service.icon} width="36" height="36" />
            </div>
            <h3 class="text-xl font-bold">
              {#if $isEditing}
                <PlainText bind:content={service.title} />
              {:else}
                {service.title}
              {/if}
            </h3>
          </div>
          <p class="mb-4">
            {#if $isEditing}
              <PlainText bind:content={service.description} />
            {:else}
              {service.description}
            {/if}
          </p>
          <div class="service-features">
            <h4 class="text-sm font-bold text-blue-600 mb-2">Key Features:</h4>
            <ul class="list-disc pl-5">
              {#each service.features as feature}
                <li>
                  {#if $isEditing}
                    <PlainText bind:content={feature} />
                  {:else}
                    {feature}
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FAQs Section -->
<EditableAccordion
  bind:this={accordionComponent}
  faqsHtml={faqs}
  title="Frequently <span class='heading-serif'>Asked</span> Questions"
/>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/visas" />
