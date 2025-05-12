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
  import ImmigrationItem from '$lib/components/ImmigrationItem.svelte';
  import EditableVisaService from '$lib/components/EditableVisaService.svelte';
  import EditableVisaServices from '$lib/components/EditableVisaServices.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import BentoGallery from '$lib/components/BentoGallery.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import emailjs from '@emailjs/browser';

  import Icon from '@iconify/svelte';

  // Import EmailJS environment variables
  import {
    PUBLIC_EMAILJS_SERVICE_ID,
    PUBLIC_EMAILJS_TEMPLATE_ID,
    PUBLIC_EMAILJS_PUBLIC_KEY
  } from '$env/static/public';

  // Initialize EmailJS
  emailjs.init(PUBLIC_EMAILJS_PUBLIC_KEY);

  export let data;

  // --------------------------------------------------------------------------
  // DEFAULT PAGE CONTENT - ADJUST TO YOUR NEEDS
  // --------------------------------------------------------------------------
  const EMAIL = 'info@almuqadam.com';

  // Can contain spaces but must not contain the + sign
  const PHONE_NUMBER = '+44 7700 900123';

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
      image: '/images/person-placeholder.jpg',
      name: 'Sarah Johnson · Dubai, UAE'
    }
  ];

  const COUNTERS_PLACEHOLDER = [
    {
      value: '1000',
      suffix: '+',
      description: 'Successful visa applications processed worldwide.'
    },
    {
      value: '98',
      suffix: '%',
      description: 'Client satisfaction rate with our services.'
    },
    {
      value: '15',
      suffix: '+',
      description: 'Years of combined visa consultancy experience in our team.'
    }
  ];

  // Default steps data
  const STEPS_PLACEHOLDER = [
    {
      title: 'Free Assessment',
      description:
        "Send us a message or fill out the short form — we’ll review your case and let you know if you qualify, no strings attached."
    },
    {
      title: 'Documentation Support',
      description:
        "We’ll tell you exactly what documents you need, help you prepare them, and make sure everything is in order."
    },
    {
      title: 'Submit & Wait with Confidence',
      description:
        'We guide you through the application process and keep you updated. No guesswork, no stress — just clear steps all the way.'
    }
  ];

  let title,
    subtitle,
    aboutBlurb,
    steps,
    stepsTitle,
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
    whatWeDoTitle,
    showUserMenu,
    galleryImages,
    galleryTitle,
    contactTitle,
    contactSubtitle,
    officeAddress1,
    phone1,
    email,
    logoText,
    visaServices;

  // Form fields
  let fullName = '';
  let emailInput = '';
  let phone = '';
  let currentVisaStatus = '';
  let visaNeeded = '';
  let message = '';
  let contactConsent = false;
  let isSubmitting = false;

  // Notification state
  let showNotification = false;
  let notificationMessage = '';

  // Helper function to create Google Maps URL from address
  function getGoogleMapsUrl(address) {
    // Encode the address for use in a URL
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'Almuqadam';
    logoText = data.page?.logoText || 'Almuqadam';
    subtitle = data.page?.subtitle || 'We Assist You in Your Global Journey';
    aboutBlurb =
      data.page?.aboutBlurb ||
      'We are UK-based and here to help you get your visit visa without the hassle. We work mostly with students and professionals who want to travel to Europe, the US, or Australia. There is no jargon, no false hopes—just real help from someone who’s done it hundreds of times.';
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
    whatWeDoTitle = data.page?.whatWeDoTitle || 'What We Do';
    bioPicture = data.page?.bioPicture || '/images/person-placeholder.jpg';
    bioTitle = data.page?.bioTitle || "Hi, I'm Almuqadam — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    steps = JSON.parse(JSON.stringify(data.page?.steps || STEPS_PLACEHOLDER));
    stepsTitle = data.page?.stepsTitle || 'Our Visa Process – Just 3 Simple Steps';
    galleryTitle = data.page?.galleryTitle || 'Visa Destinations Gallery';
    galleryImages = JSON.parse(
      JSON.stringify(
        data.page?.galleryImages || [
          {
            src: '/images/person-placeholder.jpg',
            alt: 'Gallery image 1'
          },
          {
            src: '/images/person-placeholder.jpg',
            alt: 'Gallery image 2'
          },
          {
            src: '/images/person-placeholder.jpg',
            alt: 'Gallery image 3'
          },
          {
            src: '/images/person-placeholder.jpg',
            alt: 'Gallery image 4'
          },
          {
            src: '/images/person-placeholder.jpg',
            alt: 'Gallery image 5'
          }
        ]
      )
    );

    // Contact section
    contactTitle = data.page?.contactTitle || 'Contact Us';
    contactSubtitle = data.page?.contactSubtitle || 'Get in touch with our team';
    officeAddress1 = data.page?.officeAddress1 || '19 Ashwood Close, Greater London, United Kingdom';

    phone1 = data.page?.phone1 || '+44 7700 900123';
    email = data.page?.email || 'info@almuqadam.com';

    // Initialize visa services
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

    // Reset form fields
    fullName = '';
    emailInput = '';
    phone = '';
    currentVisaStatus = '';
    visaNeeded = '';
    message = '';
    contactConsent = false;
    isSubmitting = false;
    showNotification = false;

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
      text: '"Add a quote text here"',
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

  async function handleSubmit() {
    try {
      // Set loading state
      isSubmitting = true;

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: fullName,
        from_email: emailInput,
        phone: phone || 'Not provided',
        current_visa_status: currentVisaStatus || 'Not provided',
        visa_needed: visaNeeded,
        message: message || 'No message provided',
        contact_consent: contactConsent ? 'Yes' : 'No',
        to_email: EMAIL
      };

      // Send email using EmailJS directly from the client
      const result = await emailjs.send(
        PUBLIC_EMAILJS_SERVICE_ID,
        PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result.text);

      // Reset form fields
      fullName = '';
      emailInput = '';
      phone = '';
      currentVisaStatus = '';
      visaNeeded = '';
      message = '';
      contactConsent = false;

      // Show success notification
      notificationMessage = 'Thank you! Your message has been received. We\'ll get back to you shortly.';
      showNotification = true;

      // Notification will auto-hide after the duration set in the component
    } catch (error) {
      console.error('Error submitting form:', error);
      notificationMessage = 'There was an error sending your message. Please try again or contact us directly by phone.';
      showNotification = true;
    } finally {
      // Reset loading state
      isSubmitting = false;
    }
  }

  // No need for event handlers anymore, we're using direct binding

  async function savePage() {
    try {
      // Only persist the start page when logged in as an admin
      if ($currentUser) {
        // Make a deep copy of visaServices to ensure all changes are captured
        const visaServicesCopy = JSON.parse(JSON.stringify(visaServices));

        await fetchJSON('POST', '/api/save-page', {
          pageId: 'home',
          page: {
            title,
            logoText,
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
            heroImage,
            whatWeDoTitle,
            steps,
            stepsTitle,
            galleryImages,
            galleryTitle,
            // Contact section
            contactTitle,
            contactSubtitle,
            officeAddress1,
            phone1,
            email,
            visaServices: visaServicesCopy
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
  <title>Almuqadam - Explore Beyond the boundries | Visit Visa Consultancy</title>
  <meta
    name="description"
    content="Expert visa consultancy services to help you explore the world. We specialize in visit visas with high approval rates and personalized guidance."
  />
  <link rel="alternate" hreflang="en" href="https://almuqadam.com" />
  <link rel="canonical" href="https://almuqadam.com" />
</svelte:head>
<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>
<!-- Hero -->
<section class="hero-section">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div class="hero-content-center">
      <h1 class="hero-title-center"><PlainText bind:content={title} /></h1>
      <p><PlainText bind:content={subtitle} /></p>
      <div class="hero-button-list">
        <a href="#contactSec" class="button-gradient w-button">Free Visa Assessment</a>
        <!-- <a href="tel:{phone1}" class="button-secondary-2-outline w-inline-block"
          >
          <Icon
            class="text-blue-600"
            icon="carbon:phone"
            width="24"
            height="24"
          />
          <div>Let's Talk</div>
        </a> -->
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
      alt="Hero image"
    />
  </div>
  <div class="hero-blur gradient-2"></div>
  <div class="hero-blur-divider"></div>
</section>

<!-- about -->
<section class="about-section section-spacing-bottom">
  <div class="w-layout-blockcontainer container w-container">
      <div class="about-content-right">
      <span class="text-primary-1">About Us</span>

        <div>

          <h2 class="about-title-right"><PlainText bind:content={aboutBlurb} /></h2>
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

<!-- Services -->
<section class="immigration-section">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="943f276d-10dd-ea22-23fd-05ec45819578" style="" class="immigration-wrap">
      <div class="section-title immigration-section-title">
      <span class="text-primary-1">Our Services</span>

        <h2>What We Offer</h2>
      </div>
      <div class="">
        <div class="">
          <div class="">
            <EditableVisaServices bind:services={visaServices} />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="step-section section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="29680200-4a43-3181-792e-694af7a13e5b" class="section-title text-center">
      <span class="text-primary-1">How It Works</span>
      <h2><PlainText bind:content={stepsTitle} /></h2>
    </div>
  </div>
  <div data-w-id="564a66c3-0f05-b260-7019-72c51ed9e5f5" style="" class="step-wrap">
    <img
      src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778e316e8221903bac49617_vector-02.svg"
      loading="eager"
      alt="Vector 02"
      class="vector-02"
    />
    <div class="w-layout-blockcontainer container w-container">
      <div class="grid-step">
        <div class="step-item first">
          <div class="step-number gradient-1">
            <div>01</div>
          </div>
          <h3 class="step-title"><PlainText bind:content={steps[0].title} /></h3>
          <p class="no-margin"><PlainText bind:content={steps[0].description} /></p>
        </div>
        <div class="step-item center">
          <div class="step-number bg-black">
            <div>02</div>
          </div>
          <h3 class="step-title"><PlainText bind:content={steps[1].title} /></h3>
          <p class="no-margin"><PlainText bind:content={steps[1].description} /></p>
        </div>
        <div class="step-item">
          <div class="step-number gradient-1">
            <div>03</div>
          </div>
          <h3 class="step-title"><PlainText bind:content={steps[2].title} /></h3>
          <p class="no-margin"><PlainText bind:content={steps[2].description} /></p>
        </div>
      </div>
    </div>
  </div>
</section>



<!-- FAQs -->
<!-- <div class="bg-white">
  <div class="max-w-screen-md mx-auto px-6">
    <div class="font-bold text-sm sm:text-base pt-12 sm:pt-24 -mb-6 md:-mb-12">FAQs</div>
    <div class="prose md:prose-xl pb-12 sm:pb-24">
      <RichText multiLine bind:content={faqs} />
    </div>
  </div>
</div> -->

<!-- Contact Section -->
<section id="contactSec" class="section-spacing" style="padding-top: 0;">
  <div class="w-layout-blockcontainer container w-container">


    <div class="grid-contact-split">

      <!-- Contact Information -->
      <div class="contact-info">
        <div class="section-title text-start mb-12">
          <h2 class=""><PlainText bind:content={contactTitle} /></h2>
          <p class="text-xl mt-4"><PlainText bind:content={contactSubtitle} /></p>
        </div>
        <div class="phone">
          <h6 class="text-blue-600 mb-3">Phone</h6>
          {#if $isEditing}
            <div class="flex gap-2">
              <Icon
                class="text-blue-600"
                icon="carbon:phone"
                width="24"
                height="24"
              />
              <PlainText bind:content={phone1} />
            </div>
          {:else}
            <a href="tel:{phone1}" class="hover:text-blue-600 transition-colors flex gap-2">
              <Icon
                class="text-blue-600"
                icon="carbon:phone"
                width="24"
                height="24"
              />
              {phone1}
            </a>
          {/if}
        </div>

           <div class="email py-6">
            <h6 class="text-blue-600 mb-3">Email</h6>
            {#if $isEditing}
              <div class="flex gap-2">
                <Icon
                  class="text-blue-600"
                  icon="ic:baseline-email"
                  width="24"
                  height="24"
                />
                <PlainText bind:content={email} />
              </div>
            {:else}
              <a href="mailto:{email}" class="hover:text-blue-600 transition-colors flex gap-2">
                <Icon icon="mdi:envelope-outline" width="24" height="24" />
                {email}
              </a>
            {/if}
           </div>

<div class="address">
  <h6 class="text-blue-600 mb-3">Address</h6>
  {#if $isEditing}
    <p><RichText bind:content={officeAddress1} /></p>
  {:else}
    <p>
      <a
        href={getGoogleMapsUrl(officeAddress1)}
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-blue-600 transition-colors flex gap-2"
      >
      <Icon icon="akar-icons:location" width="24" height="24" />
        {officeAddress1}
      </a>
    </p>
  {/if}
</div>



            <div>

            </div>

        </div>


      <!-- Contact Form -->
      <div class="contact-item">
        <h6 class=" mb-6 text-blue-600">Get a Free Visa Assessment</h6>

        <form on:submit|preventDefault={handleSubmit} class="w-form">
          <div class="grid-contact-form-inner">
            <div>
              <label for="fullName" class="sr-only">Full Name</label>
              <input
                type="text"
                class="form-input w-input"
                maxlength="256"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                aria-label="Full Name"
                required
                bind:value={fullName}
              />
            </div>
            <div>
              <label for="email" class="sr-only">Email Address</label>
              <input
                type="email"
                class="form-input w-input"
                maxlength="256"
                name="email"
                id="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
                bind:value={emailInput}
              />
            </div>
          </div>
          <div class="grid-contact-form-inner mb-0">
            <div>
              <label for="phone" class="sr-only">Phone Number</label>
              <input
                type="tel"
                class="form-input w-input"
                maxlength="256"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                aria-label="Phone Number"
                bind:value={phone}
              />
            </div>
            <div>
              <label for="currentVisaStatus" class="sr-only">Current Visa Status</label>
              <select
                class="form-input w-input"
                name="currentVisaStatus"
                id="currentVisaStatus"
                aria-label="Current Visa Status"
                bind:value={currentVisaStatus}>
                <option value="" disabled selected>Current Visa Status</option>
                <option value="student">Student</option>
                <option value="work">Work Permit</option>
                <option value="tourist">Tourist</option>
                <option value="none">None</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label for="visaNeeded" class="sr-only">Which visa do you need?</label>
            <select
              class="form-input w-input"
              name="visaNeeded"
              id="visaNeeded"
              aria-label="Which visa do you need?"
              required
              bind:value={visaNeeded}>
              <option value="" disabled selected>Which visa do you need?</option>
              <option value="schengen">Schengen</option>
              <option value="usa">USA</option>
              <option value="australia">Australia</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="mb-5">
            <label for="message" class="sr-only">Short Message</label>
            <textarea
              class="form-input form-textarea w-input"
              maxlength="5000"
              name="message"
              id="message"
              placeholder="Short Message (optional)"
              aria-label="Short Message"
              bind:value={message}
            ></textarea>
          </div>

          <div class="mb-5">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="contactConsent"
                id="contactConsent"
                required
                bind:checked={contactConsent}
              />
              <span>I agree to be contacted for visa assistance.</span>
            </label>
          </div>

          <button type="submit" class="button-gradient w-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>



<Footer counter="/" />

<!-- Notification component -->
<Notification
  type="success"
  message={notificationMessage}
  bind:show={showNotification}
  duration={5000}
/>
