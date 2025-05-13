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
  import Icon from '@iconify/svelte';
  import WhyChooseItem from '$lib/components/WhyChooseItem.svelte';
  import TeamMember from '$lib/components/TeamMember.svelte';

  export let data;

  // Default content
  let title, subtitle, aboutContent, teamMembers, missionStatement, visionStatement, heroImage, heroImage2, showUserMenu, cta, whyChooseItems;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'About Almuqadam';
    subtitle = data.page?.subtitle || 'Your Trusted Visa Consultancy Partner';
    aboutContent = data.page?.aboutContent ||
      `<p>Almuqadam is a premier visa consultancy service based in the UK, dedicated to helping clients navigate the complex world of international travel documentation. With years of experience and a commitment to excellence, we provide personalized visa solutions for individuals, families, and businesses.</p>
      <p>Our team of experts understands the nuances of visa applications for various countries and stays up-to-date with the latest immigration policies and requirements. We take pride in our high success rate and the trust our clients place in us.</p>`;
    teamMembers = JSON.parse(JSON.stringify(data.page?.teamMembers || [
      {
        name: 'John Smith',
        position: 'Founder & CEO',
        bio: 'With over 15 years of experience in immigration consulting, John leads our team with expertise and passion.',
        image: '/images/person-placeholder.jpg',
        email: 'john@almuqadam.com',
        phone: '+(251) 854-6308'
      },
      {
        name: 'Maria Gonzales',
        position: 'Family Visa Specialist',
        bio: 'Maria is dedicated to reuniting families by providing expert assistance with family sponsorship visas.',
        image: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/6780bca5585654292b078021_agent-03.avif',
        email: 'maria@almuqadam.com',
        phone: '+(251) 854-6308'
      }
    ]));
    missionStatement = data.page?.missionStatement || 'Our mission is to make international travel accessible to everyone by providing expert visa guidance and support throughout the application process.';
    visionStatement = data.page?.visionStatement || 'We envision a world where borders are no obstacle to exploration, education, and business opportunities.';
    heroImage = data.page?.heroImage || '/images/ch_hero.jpeg';
    heroImage2 = data.page?.heroImage2 || '/images/ch_hero.jpeg';
    cta = data.globalData?.cta;
    whyChooseItems = JSON.parse(JSON.stringify(data.page?.whyChooseItems || [
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
    ]));
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
          pageId: 'about',
          page: {
            title,
            subtitle,
            aboutContent,
            teamMembers,
            missionStatement,
            visionStatement,
            heroImage,
            heroImage2,
            whyChooseItems
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
    content="Learn about Almuqadam, your trusted visa consultancy partner. Discover our mission, vision, and the team behind our successful visa services."
  />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<!-- Hero Section -->

<section class="about-hero-section">
  <div class="w-layout-blockcontainer container w-container">
    <div  class="hero-content-center space-y-8">
      <h1 class="about-hero-title"><PlainText bind:content={title} /></h1>
      <p class="lg:w-3/4 mx-auto"><PlainText bind:content={subtitle} /></p>

      <a href="/contact" class="button-gradient w-button">Start your journey</a>


    </div>
    <div  class="grid-about-hero-image">
      <Image
      class="about-hero-image d-none md:block"
      maxWidth="1000"
      maxHeight="500"
      quality="1"
      bind:src={heroImage}
      alt="About Almuqadam hero image"
    />
      <Image
      class="about-hero-image"
      maxWidth="500"
      maxHeight="500"
      quality="1"
      bind:src={heroImage2}
      alt="About Almuqadam hero image"
    />

  </div>
  </div>
</section>



<!-- About Content Section -->
<section class="about-section-split section-spacing">
  <div class="w-layout-blockcontainer container-medium w-container">
    <div class="about-content-wrap">
      <h2>Who we are</h2>
      <div class="about-content">
        <RichText multiLine bind:content={aboutContent} />
      </div>
      <div class="grid-about-split-feature">
        <div>
          <h5 class="about-split-feature-title">Our Mission</h5>
          <PlainText bind:content={missionStatement} />
        </div>
        <div>
          <h5 class="about-split-feature-title">Our Vision</h5>
          <PlainText bind:content={visionStatement} />
        </div>
      </div>
    </div>
  </div>
  <div  class="vector-01 sm"><img src="/images/vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image" /></div>
</section>

<section class="why-choose-section">
  <div class="w-layout-blockcontainer container w-container">
    <div   class="section-title text-center">
      <h2>Why <span class="heading-serif">choose</span> us</h2>
    </div>
    <div  class="grid-why-choose-two">
      {#each whyChooseItems as item, index}
        <WhyChooseItem
          bind:icon={item.icon}
          bind:title={item.title}
          bind:description={item.description}
          on:delete={() => {
            whyChooseItems = whyChooseItems.filter((_, i) => i !== index);
          }}
        />
      {/each}

      {#if $isEditing}
        <button
          class="add-item-button"
          on:click={() => {
            whyChooseItems = [...whyChooseItems, {
              icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677b8e1f1eb128761b662609_icon-15.svg',
              title: 'New Feature',
              description: 'Add description here'
            }];
          }}
        >
          <Icon icon="mdi:plus" width="24" height="24" />
          Add Feature
        </button>
      {/if}
    </div>
  </div>
</section>


<!-- Team Section -->
<section class="section-spacing pb-0">
  <div class="w-layout-blockcontainer container w-container">
    <div class="section-title text-center mb-12">
      <h2>Our Team</h2>
      <p class="text-xl mt-4">Meet the experts behind our successful visa services</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each teamMembers as member, index}
        <TeamMember
          bind:member
          on:delete={() => {
            teamMembers = teamMembers.filter((_, i) => i !== index);
          }}
        />
      {/each}

      {#if $isEditing}
        <button
          class="add-team-member-button"
          on:click={() => {
            teamMembers = [...teamMembers, {
              name: 'New Team Member',
              position: 'Position Title',
              bio: 'Add a short bio here.',
              image: '/images/person-placeholder.jpg',
              email: 'email@example.com',
              phone: '+(000) 000-0000'
            }];
          }}
        >
          <Icon icon="mdi:plus" width="24" height="24" />
          Add Team Member
        </button>
      {/if}
    </div>
  </div>
</section>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/about" />

<style>
  .add-item-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: #f0f0f0;
    border: 1px dashed #ccc;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
  }

  .add-item-button:hover {
    background-color: #e0e0e0;
  }

  .add-team-member-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px;
    background-color: #f0f0f0;
    border: 1px dashed #ccc;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
    grid-column: span 2;
    margin-top: 20px;
  }

  .add-team-member-button:hover {
    background-color: #e0e0e0;
  }
</style>
