<script>
  import { goto } from '$app/navigation';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import CountryTeaser from '$lib/components/CountryTeaser.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import { currentUser } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;
  let showUserMenu;
  let cta;

  $: {
    $currentUser = data.currentUser;
    cta = data.globalData?.cta;
  }
</script>

<svelte:head>
  <title>Countries We Serve | Almuqadam</title>
  <meta name="description" content="Explore the countries we provide visa services for. Get detailed information and visa requirements for each destination." />
</svelte:head>

<WebsiteHeader bind:showUserMenu>
  <div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
    <PrimaryButton type="button" on:click={() => goto('/countries/new')}>Add New Country</PrimaryButton>
    <LoginMenu />
  </div>
</WebsiteHeader>

  <section class="hero-inner">
    <div class="w-layout-blockcontainer container w-container">
      <div data-w-id="9f6cfea9-3da1-14ec-2efe-1d4facbf704f"  class="hero-inner-content">
         {#if data.countries.length !== 0}
        <h1 class="hero-inner-title no-margin"><span class="heading-serif">Countries</span> we serve</h1>
       {:else}
      <div class="md:text-xl py-4">No countries have been published so far.</div>
       {/if}

      </div>
    </div>
  </section>

    <section class="countries-section section-spacing-sm">
    <div class="w-layout-blockcontainer container w-container">
      <div data-w-id="11e75272-9129-6f71-4957-3917aedcd938" class="w-dyn-list">
        <div role="list" class="grid-countries w-dyn-items">
         {#each data.countries as country, i}
      <CountryTeaser {country} firstEntry={i === 0} />
    {/each}
        </div>
      </div>
    </div>
  </section>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/countries" />
