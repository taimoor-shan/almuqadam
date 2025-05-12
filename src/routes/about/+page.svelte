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

  export let data;

  // Default content
  let title, subtitle, aboutContent, teamMembers, missionStatement, visionStatement, heroImage, heroImage2, showUserMenu, cta;

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
        image: '/images/person-placeholder.jpg'
      },
      {
        name: 'Sarah Johnson',
        position: 'Senior Visa Consultant',
        bio: 'Sarah specializes in complex visa cases and has helped hundreds of clients achieve successful outcomes.',
        image: '/images/person-placeholder.jpg'
      }
    ]));
    missionStatement = data.page?.missionStatement || 'Our mission is to make international travel accessible to everyone by providing expert visa guidance and support throughout the application process.';
    visionStatement = data.page?.visionStatement || 'We envision a world where borders are no obstacle to exploration, education, and business opportunities.';
    heroImage = data.page?.heroImage || '/images/ch_hero.jpeg';
    heroImage2 = data.page?.heroImage2 || '/images/ch_hero.jpeg';
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
          pageId: 'about',
          page: {
            title,
            subtitle,
            aboutContent,
            teamMembers,
            missionStatement,
            visionStatement,
            heroImage,
            heroImage2
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
      class="about-hero-image"
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
          <PlainText bind:content={missionStatement} />
        </div>
        <div>
          <PlainText bind:content={visionStatement} />

        </div>
      </div>
    </div>
  </div>
  <div  class="vector-01 sm"><img src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif" loading="lazy" sizes="(max-width: 628px) 100vw, 628px" srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01-p-500.png 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778d61303bfc2abf8a13ab9_vector-01.avif 628w" alt="Vector 01" class="vector-01-image" /></div>
</section>




<!-- Team Section -->
<section class="section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div class="section-title text-center mb-12">
      <h2>Our Team</h2>
      <p class="text-xl mt-4">Meet the experts behind our successful visa services</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each teamMembers as member, i}
        <div class="team-member-card">
          <div class="team-member-image">
            <Image
              class="rounded-full w-32 h-32 object-cover mx-auto"
              maxWidth="128"
              maxHeight="128"
              quality="1"
              bind:src={member.image}
              alt={member.name}
            />
          </div>
          <div class="team-member-info text-center mt-4">
            <h3 class="text-xl font-bold">
              {#if $isEditing}
                <PlainText bind:content={member.name} />
              {:else}
                {member.name}
              {/if}
            </h3>
            <p class="text-blue-600 mb-2">
              {#if $isEditing}
                <PlainText bind:content={member.position} />
              {:else}
                {member.position}
              {/if}
            </p>
            <p>
              {#if $isEditing}
                <PlainText bind:content={member.bio} />
              {:else}
                {member.bio}
              {/if}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/about" />
