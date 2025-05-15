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

<div class="pb-8">
  <div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
    <div class="font-bold text-sm">COUNTRIES WE SERVE</div>
    {#if data.countries.length === 0}
      <div class="md:text-xl py-4">No countries have been published so far.</div>
    {/if}
  </div>

  <div class="grid-countries">
    {#each data.countries as country, i}
      <CountryTeaser {country} firstEntry={i === 0} />
    {/each}
  </div>
</div>

<EditableWebsiteTeaser bind:cta />

<Footer counter="/countries" />
