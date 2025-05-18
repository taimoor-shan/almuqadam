<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Image from '$lib/components/Image.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing, globalPhone, globalEmail, globalAddress } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import EditableAccordion from '$lib/components/EditableAccordion.svelte';

  export let data;

  // Default content
  let title, subtitle, contactInfo, heroImage, showUserMenu, faqs;
  let phoneSupport1, emailSupport, officeAddress1, officeHours1, officeHours2;

  function initOrReset() {
    $currentUser = data.currentUser;

    // Log the data to debug
    console.log('Page data:', data.page);

    // Use nullish coalescing to handle both undefined and null values
    title = data.page?.title ?? 'How can we help you today?';
    subtitle = data.page?.subtitle ?? 'Get in touch with our visa experts';
    contactInfo = data.page?.contactInfo ??
      `<p>We're here to help with all your visa-related questions and needs. Reach out to us through any of the contact methods below, or fill out the form to request a free consultation.</p>
      <p>Our team of visa experts is available Monday through Friday, 9:00 AM to 6:00 PM UK time.</p>`;
    heroImage = data.page?.heroImage ?? '/images/ch_hero.jpeg';
    faqs = data.page?.faqs ??
      `<h2>What documents do I need for a visa application?</h2>
      <p>Required documents typically include a valid passport, completed application form, passport-sized photos, proof of travel insurance, flight itinerary, accommodation details, proof of financial means, and a cover letter. Specific requirements vary by country and visa type.</p>
      <h2>How long does the visa application process take?</h2>
      <p>Processing times vary by country and visa type, ranging from a few days to several weeks. We recommend applying at least 4-6 weeks before your planned travel date.</p>
      <h2>What is your success rate for visa applications?</h2>
      <p>We maintain a high success rate of over 95% for visa applications. Our expertise in preparing thorough applications significantly increases approval chances.</p>`;

    // New contact section variables
    phoneSupport1 = data.page?.phoneSupport1 ?? '(91) 125 879 786';
    emailSupport = data.page?.emailSupport ?? 'info@almuqadam.com';
    officeAddress1 = data.page?.officeAddress1 ?? 'Las Vegas - 4th Floor, Plot No.22,145 Murphy Canyon Rd.';
    officeHours1 = data.page?.officeHours1 ?? 'Mon-Sat: 9 AM – 6 PM';
    officeHours2 = data.page?.officeHours2 ?? 'Sunday: Closed';

    $isEditing = false;
  }

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  async function savePage() {
    try {
      if ($currentUser) {
        // If we have an accordion component reference, get the HTML from it
        if (accordionComponent) {
          faqs = accordionComponent.itemsToHtml();
        }

        await fetchJSON('POST', '/api/save-page', {
          pageId: 'contact',
          page: {
            title,
            subtitle,
            contactInfo,
            heroImage,
            phoneSupport1,
            emailSupport,
            officeAddress1,
            officeHours1,
            officeHours2,
            faqs
          }
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  // Reference to the accordion component
  let accordionComponent;

  // Initialize page data
  initOrReset();
</script>

<svelte:head>
  <title>{title} | Almuqadam - Explore Beyond the boundries</title>
  <meta
    name="description"
    content="Contact Almuqadam for expert visa consultancy services. Get in touch with our team for personalized assistance with your visa application."
  />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>


<!-- Contact Section -->
<section class="contact-hero-section">
  <div class="w-layout-blockcontainer container w-container">
    <!-- <div data-w-id="d9aa0ef6-14d2-5c61-26e2-5b1573e0c211" style="" class="section-title text-center">
      <h1><PlainText bind:content={title} /></h1>
    </div> -->
    <div data-w-id="f7ce0d7b-34a8-f497-a911-5fde2ea123fe" style="margin-top: 0 !important;" class="grid-contact mt-0-important">
      <div class="contact-split-image-wrap border">
        <Image
          bind:src={heroImage}
          loading="eager"
          alt="Contact image"
          class="contact-split-image"
          maxWidth="640"
          maxHeight="580"
          quality="1"
        />
      </div>
      <div id="w-node-_63bdca00-d749-298a-957d-ccf9955bcc13-dd74d3aa">
        <ContactForm
          title="How can we help you today?"
          recipientEmail={$globalEmail || emailSupport}
          customClass="no-margin w-form"
        />
      </div>
    </div>
    <div data-w-id="24ef07e0-c8c3-1867-6557-1a6b46113e7b" style="" class="grid-why-choose-two">
      <div class="contact-item">
        <img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b762dae199ebab855a5b5_icon-12.svg" loading="eager" alt="Phone support icon" class="contact-icon" />
        <div class="contact-info">
          <h2 class="contact-info-title">Quick phone support</h2>
          <p><PlainText bind:content={subtitle} /></p>
          <a href={`tel:${$globalPhone || phoneSupport1}`} class="button-link text-primary-1">
            {#if $isEditing}
              <PlainText bind:content={phoneSupport1} />
            {:else}
              {$globalPhone || phoneSupport1}
            {/if}
          </a>
          
        </div>
      </div>
      <div class="contact-item"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b762d82e5235093fdcbfa_icon-13.svg" loading="eager" alt="Email icon" class="contact-icon" />
        <div class="contact-info">
          <h2 class="contact-info-title">Email for quick replies</h2>
          <p><PlainText bind:content={contactInfo} /></p>
          <a href={`mailto:${$globalEmail || emailSupport}`} class="button-link text-primary-1">
            {#if $isEditing}
              <PlainText bind:content={emailSupport} />
            {:else}
              {$globalEmail || emailSupport}
            {/if}
          </a>
        </div>
      </div>
      <div class="contact-item"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778c8c269cc7a0553111f1e_icon-02.svg" loading="eager" alt="Office location icon" class="contact-icon" />
        <div class="contact-info">
          <h2 class="contact-info-title">Visit us for personal help</h2>
          <div class="address-list">
            <div>
              {#if $isEditing}
                <PlainText bind:content={officeAddress1} />
              {:else}
                {$globalAddress || officeAddress1}
              {/if}
            </div>
            <div>
              {#if $isEditing}
                <PlainText bind:content={officeHours1} />
              {:else}
                {officeHours1}
              {/if}
            </div>
            <div>
              {#if $isEditing}
                <PlainText bind:content={officeHours2} />
              {:else}
                {officeHours2}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Faqs Section -->
<EditableAccordion bind:this={accordionComponent} faqsHtml={faqs} />

<Footer counter="/contact" />

