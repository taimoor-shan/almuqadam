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
  const EMAIL = 'realestate509llc@gmail.com';

  // Can contain spaces but must not contain the + sign
  const PHONE_NUMBER = '947 277 0723';

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
      text: '"509 Real Estate Services made selling my home so easy! They gave me a fair cash offer and closed quickly. I didn\'t have to worry about repairs or showings. The whole process was smooth and professional."',
      image: '/images/person-placeholder.jpg',
      name: 'Sarah Johnson · Minneapolis, MN'
    }
  ];

  const COUNTERS_PLACEHOLDER = [
    {
      value: '100',
      suffix: '+',
      description: 'Homes bought, renovated, and sold throughout Minnesota.'
    },
    {
      value: '98',
      suffix: '%',
      description: 'Client satisfaction rate with our services.'
    },
    {
      value: '15',
      suffix: '+',
      description: 'Years of combined real estate experience in our team.'
    }
  ];

  // Default steps data
  const STEPS_PLACEHOLDER = [
    {
      title: 'Contact Us',
      description:
        "Reach out via our form or phone. Tell us a bit about your property or what you're looking for."
    },
    {
      title: 'Get a Fast, Fair Offer',
      description:
        "We'll evaluate your home or situation and provide a no-obligation cash offer—often within 24–48 hours."
    },
    {
      title: 'Close on Your Terms',
      description:
        'If you accept, we handle everything. Choose your closing date. No fees, no surprises.'
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
    lightboxOpen = false,
    lightboxIndex = 0,
    contactTitle,
    contactSubtitle,
    officeAddress1,
    officeAddress2,
    phone1,
    phone2,
    email,
    logoText;

  // Form fields
  let name = '';
  let emailInput = '';
  let phone = '';
  let message = '';
  let interested_in = '';
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
    title = data.page?.title || '509 Real Estate Services LLC';
    logoText = data.page?.logoText || '509 Real Estate Services LLC';
    subtitle = data.page?.subtitle || 'We Buy, Renovate, and Sell Homes in Minnesota';
    aboutBlurb =
      data.page?.aboutBlurb ||
      'We are dedicated to helping homeowners in Minnesota sell their properties quickly and hassle-free. Whether you need to sell your home fast or are looking for a beautifully renovated property, our team of real estate experts provides personalized service to meet your needs.';
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
    bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    steps = JSON.parse(JSON.stringify(data.page?.steps || STEPS_PLACEHOLDER));
    stepsTitle = data.page?.stepsTitle || 'How It Works – Just 3 Simple Steps';
    galleryTitle = data.page?.galleryTitle || 'Our Property Gallery';
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
    officeAddress1 = data.page?.officeAddress1 || '8900 penn ave ste 200 Bloomington, MN 55431';
    officeAddress2 = data.page?.officeAddress2 || '418 N Main st floor 2 Royal oak, MI 48067';
    phone1 = data.page?.phone1 || '947 277 0723';
    phone2 = data.page?.phone2 || '313 784 3610';
    email = data.page?.email || '509realestateservicesllc@gmail.com';

    // Reset form fields
    name = '';
    emailInput = '';
    phone = '';
    message = '';
    interested_in = '';
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
        from_name: name,
        from_email: emailInput,
        phone: phone || 'Not provided',
        interested_in: interested_in || 'Not specified',
        message: message,
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
      name = '';
      emailInput = '';
      phone = '';
      message = '';
      interested_in = '';

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
            officeAddress2,
            phone1,
            phone2,
            email
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
  <title>509 Real Estate Services LLC | Minnesota Home Buyers & Sellers</title>
  <meta
    name="description"
    content="We buy homes in Minnesota, renovate them, and sell them. We also sell homes for larger companies. Get a free offer for your property today!"
  />
  <link rel="alternate" hreflang="en" href="https://509realestate.com" />
  <link rel="canonical" href="https://509realestate.com" />
</svelte:head>
<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>
<!-- Hero -->
<section class="hero-section">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div class="hero-content-center">
      <h6 class="text-blue-700 md:text-2xl"><PlainText bind:content={logoText} /></h6>
      <h1 class="hero-title-center"><PlainText bind:content={title} /></h1>
      <p><PlainText bind:content={subtitle} /></p>
      <div class="hero-button-list">
        <a href="#contactSec" class="button-gradient w-button">Get a Free Offer</a>
        <a href="tel:{phone1}" class="button-secondary-2-outline w-inline-block"
          ><img
            src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778ce50f6ef7ca3e10af73f_icon-03.svg"
            loading="eager"
            alt="Icon 03"
            class="button-icon"
          />
          <div>Let's Talk</div>
        </a>
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
  <div class="container w-container">
    <div class="flex flex-col md:flex-row gap-6 justify-between">
      <div class="w-full md:w-[60%]">
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
      <div class="w-full md:w-[30%]">
        <div class="immigration-item-light w-inline-block border border-blue-600">
          <h4 class="">
            <PlainText bind:content={whatWeDoTitle} />
          </h4>
          <span class="line w-[1px] h-[100%] bg-blue-600"></span>
          <div role="list" class="flex flex-col">
            <ImmigrationItem
              service={{
                title: 'We Buy Homes—Any Condition'
              }}
            />

            <ImmigrationItem
              service={{
                title: 'We Renovate & Add Value'
              }}
            />

            <ImmigrationItem
              service={{
                title: 'We Sell Homes for Big Firms'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="step-section section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="29680200-4a43-3181-792e-694af7a13e5b" class="section-title text-center">
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
<!-- Bento Gallery -->
<BentoGallery
  bind:images={galleryImages}
  bind:title={galleryTitle}
  bind:lightboxOpen
  bind:lightboxIndex
/>

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
    <div class="section-title text-center mb-12">
      <h2 class=""><PlainText bind:content={contactTitle} /></h2>
      <p class="text-xl mt-4"><PlainText bind:content={contactSubtitle} /></p>
    </div>

    <div class="grid-contact-split">
      <!-- Contact Information -->
      <div class="">
        <div class="gap-12 flex flex-col justify-between">
          <div class="contact-item">
            <h3 class="text-blue-600 text-xl font-semibold mb-3">Office Locations</h3>
           <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-1/2">
              <div class="flex items-start">
                <img
                  src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778c8c269cc7a0553111f1e_icon-02.svg"
                  loading="eager"
                  alt="Location Icon"
                  class="footer-address-icon mr-2"
                />
                <div>
                  <p class="font-semibold">Business address</p>
                  {#if $isEditing}
                    <p><RichText bind:content={officeAddress1} /></p>
                  {:else}
                    <p>
                      <a
                        href={getGoogleMapsUrl(officeAddress1)}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-blue-600 transition-colors"
                      >
                        {officeAddress1}
                      </a>
                    </p>
                  {/if}
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2">
              <div class="flex items-start">
                <img
                  src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778c8c269cc7a0553111f1e_icon-02.svg"
                  loading="eager"
                  alt="Location Icon"
                  class="footer-address-icon mr-2"
                />
                <div>
                  <p class="font-semibold">Mailing office address</p>
                  {#if $isEditing}
                    <p><RichText bind:content={officeAddress2} /></p>
                  {:else}
                    <p>
                      <a
                        href={getGoogleMapsUrl(officeAddress2)}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-blue-600 transition-colors"
                      >
                        {officeAddress2}
                      </a>
                    </p>
                  {/if}
                </div>
              </div>
            </div>
           </div>
          </div>
          <div class="contact-item">
            <div class="">
              <h3 class="text-blue-600 text-xl font-semibold mb-3">Phone</h3>
              <div class="flex items-center mb-3">
                {#if $isEditing}
                  <div class="flex gap-2">
                    <Icon
                      class="text-blue-600"
                      icon="proicons:phone"
                      width="24"
                      height="24"
                    />
                    <PlainText bind:content={phone1} />
                  </div>
                {:else}
                  <a href="tel:{phone1}" class="hover:text-blue-600 transition-colors flex gap-2">
                    <Icon
                      class="text-blue-600"
                      icon="proicons:phone"
                      width="24"
                      height="24"
                    />
                    {phone1}
                  </a>
                {/if}
              </div>
              <div class="flex items-center">
                {#if $isEditing}
                  <div class="flex gap-2">
                    <Icon
                      class="text-blue-600"
                      icon="carbon:phone"
                      width="24"
                      height="24"
                    />
                    <PlainText bind:content={phone2} />
                  </div>
                {:else}
                  <a href="tel:{phone2}" class="hover:text-blue-600 transition-colors flex gap-2">
                    <Icon
                      class="text-blue-600"
                      icon="carbon:phone"
                      width="24"
                      height="24"
                    />
                    {phone2}
                  </a>
                {/if}
              </div>
            </div>

            <div>
              <h3 class="text-blue-600 text-xl font-semibold mb-3">Email</h3>
              <div class="flex items-center">
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
                    <Icon
                      class="text-blue-600"
                      icon="ic:baseline-email"
                      width="24"
                      height="24"
                    />
                    {email}
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-item">
        <h2 class="text-2xl font-bold mb-6 text-blue-600">Get a Free Offer</h2>

        <form on:submit|preventDefault={handleSubmit} class="w-form">
          <div class="grid-contact-form-inner">
            <div>
              <label for="name" class="sr-only">Name</label>
              <input
                type="text"
                class="form-input w-input"
                maxlength="256"
                name="name"
                id="name"
                placeholder="Your name"
                aria-label="Name"
                required
                bind:value={name}
              />
            </div>
            <div>
              <label for="phone" class="sr-only">Phone</label>
              <input
                type="tel"
                class="form-input w-input"
                maxlength="256"
                name="phone"
                id="phone"
                placeholder="Your phone number"
                aria-label="Phone"
                bind:value={phone}
              />
            </div>
          </div>
          <div class="grid-contact-form-inner">
            <div class="">
              <label for="email" class="sr-only">Email</label>
              <input
                type="email"
                class="form-input w-input"
                maxlength="256"
                name="email"
                id="email"
                placeholder="Your email"
                aria-label="Email"
                required
                bind:value={emailInput}
              />
            </div>
            <div class="">
              <label for="interested_in" class="sr-only">Interested In?</label>
              <select
                class="form-input w-input"
                name="interested_in"
                id="interested_in"
                aria-label="Interested In"
                required
                bind:value={interested_in}>
                <option value="" disabled selected>Interested In?</option>
                <option value="buy">Buying</option>
                <option value="sell">Selling</option>
              </select>
            </div>
          </div>

          <div class="">
            <div class="mb-5">
              <label for="message" class="sr-only">Message</label>
              <textarea
                class="form-input form-textarea w-input"
                maxlength="5000"
                name="message"
                id="message"
                placeholder="How can we help you?"
                aria-label="Message"
                required
                bind:value={message}
              ></textarea>
            </div>

            <button type="submit" class="button-gradient w-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- Bento Lightbox -->
<Lightbox
  bind:images={galleryImages}
  bind:currentIndex={lightboxIndex}
  bind:isOpen={lightboxOpen}
/>

<Footer counter="/" />

<!-- Notification component -->
<Notification
  type="success"
  message={notificationMessage}
  bind:show={showNotification}
  duration={5000}
/>
