<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import Image from '$lib/components/Image.svelte';
  import CountryContactForm from '$lib/components/CountryContactForm.svelte';
  import { formatDate } from '$lib/util';
  export let title;
  export let content;
  export let featured_image;
  export let flag = '/images/person-placeholder.jpg';
  export let published_at = undefined;
</script>

<section class="country-detail-hero-section">
  <div class="country-detail-wrap" style={`background-image:url(${featured_image})`} >
    <div class="w-layout-blockcontainer container w-container">
      <div class="country-detail-hero-content">
        <h1 class="country-detail-hero-title">
          <PlainText bind:content={title} />
        </h1>
        {#if !published_at}
          <div class="font-bold text-sm text-white">DRAFT</div>
        {/if}
          <div class="country-flag-container">
            <Image
              class="country-detail-hero-image rounded-full"
              maxWidth="100"
              maxHeight="100"
              quality="1"
              src={flag}
              alt={title}
            />
          </div>
       
      </div>
    </div>
    <div class="country-detail-hero-overlay"></div>
  </div>
</section>

<section class="country-section section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div class="grid-country-detail">
      <div>
        <div id="country_content" class="richText">
          <RichText multiLine bind:content />
        </div>
      </div>
      <!-- Sidebar -->
      <div class="sidebar-sticky">
        <div class="sidebar-item">
          <div class="sidebar-item-inner">
            <div class="sidebar-title-inline-wrap">
              <h2 class="sidebar-title-inline">Inquire about</h2>
              <h2 class="sidebar-title-inline heading-serif text-dark"><PlainText bind:content={title} /></h2>
            </div>
            <div class="mt-6">
              <CountryContactForm
                title=""
                countryName={title}
                showTitle={true}
              />
            </div>
          </div>
          <!-- <div class="sidebar-contact">
            <h2 class="sidebar-contact-title">Contact info</h2>
            <div class="contact-wrap">
              <div class="contact-link-wrap">
                <img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b762dae199ebab855a5b5_icon-12.svg" loading="eager" alt="Phone icon" class="contact-link-icon" />
                <a href="tel:00447472770723" class="contact-link">0044 747 277 0723</a>
              </div>
              <div class="contact-link-wrap">
                <img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b762d82e5235093fdcbfa_icon-13.svg" loading="eager" alt="Email icon" class="contact-link-icon" />
                <a href="mailto:info@almuqadam.com" class="contact-link">info@almuqadam.com</a>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</section>
