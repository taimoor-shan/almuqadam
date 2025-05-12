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
  import Notification from '$lib/components/Notification.svelte';
  import Icon from '@iconify/svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

  export let data;

  // Default content
  let title, subtitle, contactInfo, officeAddress, phone, email, heroImage, showUserMenu, cta;

  // Notification state
  let showNotification = false;
  let notificationMessage = '';

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'Contact Us';
    subtitle = data.page?.subtitle || 'Get in touch with our visa experts';
    contactInfo = data.page?.contactInfo ||
      `<p>We're here to help with all your visa-related questions and needs. Reach out to us through any of the contact methods below, or fill out the form to request a free consultation.</p>
      <p>Our team of visa experts is available Monday through Friday, 9:00 AM to 6:00 PM UK time.</p>`;
    officeAddress = data.page?.officeAddress || '19 Ashwood Close, Greater London, United Kingdom';
    phone = data.page?.phone || '+44 7700 900123';
    email = data.page?.email || 'info@almuqadam.com';
    heroImage = data.page?.heroImage || '/images/ch_hero.jpeg';
    cta = data.globalData?.cta;
    $isEditing = false;
  }

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  async function savePage() {
    try {
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'contact',
          page: {
            title,
            subtitle,
            contactInfo,
            officeAddress,
            phone,
            email,
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
    content="Contact Almuqadam for expert visa consultancy services. Get in touch with our team for personalized assistance with your visa application."
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
    </div>
  </div>
  <div class="hero-image-wrap">
    <Image
      class="hero-image"
      maxWidth="1920"
      maxHeight="1080"
      quality="1"
      bind:src={heroImage}
      alt="Contact us hero image"
    />
  </div>
  <div class="hero-blur gradient-2"></div>
  <div class="hero-blur-divider"></div>
</section>

<!-- Contact Section -->
<section class="section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div class="grid-contact-split">
      <!-- Contact Information -->
      <div class="contact-info">
        <div class="prose md:prose-xl mb-8">
          <RichText multiLine bind:content={contactInfo} />
        </div>

        <div class="contact-details">
          <div class="mb-6">
            <h6 class="text-blue-600 mb-3">Address</h6>
            <div class="flex gap-2">
              <Icon
                class="text-blue-600 flex-shrink-0 mt-1"
                icon="carbon:location"
                width="24"
                height="24"
              />
              <div>
                {#if $isEditing}
                  <PlainText bind:content={officeAddress} />
                {:else}
                  {officeAddress}
                {/if}
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h6 class="text-blue-600 mb-3">Phone</h6>
            {#if $isEditing}
              <div class="flex gap-2">
                <Icon
                  class="text-blue-600"
                  icon="carbon:phone"
                  width="24"
                  height="24"
                />
                <PlainText bind:content={phone} />
              </div>
            {:else}
              <a href="tel:{phone}" class="hover:text-blue-600 transition-colors flex gap-2">
                <Icon
                  class="text-blue-600"
                  icon="carbon:phone"
                  width="24"
                  height="24"
                />
                {phone}
              </a>
            {/if}
          </div>

          <div class="mb-6">
            <h6 class="text-blue-600 mb-3">Email</h6>
            {#if $isEditing}
              <div class="flex gap-2">
                <Icon
                  class="text-blue-600"
                  icon="carbon:email"
                  width="24"
                  height="24"
                />
                <PlainText bind:content={email} />
              </div>
            {:else}
              <a href="mailto:{email}" class="hover:text-blue-600 transition-colors flex gap-2">
                <Icon
                  class="text-blue-600"
                  icon="carbon:email"
                  width="24"
                  height="24"
                />
                {email}
              </a>
            {/if}
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form">
        <ContactForm
          title="Send Us a Message"
          recipientEmail={email}
          customClass="contact-page-form"
        />
      </div>
    </div>
  </div>
</section>

<!-- Map Section -->
<section class="section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div class="map-container">
      <NotEditable>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47340002653!2d-0.24168120642536509!3d51.52855824164916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1656543745932!5m2!1sen!2sus"
          width="100%"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Almuqadam office location"
        ></iframe>
      </NotEditable>
    </div>
  </div>
</section>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/contact" />

<!-- Notification component -->
<Notification
  type="success"
  message={notificationMessage}
  bind:show={showNotification}
  duration={5000}
/>
