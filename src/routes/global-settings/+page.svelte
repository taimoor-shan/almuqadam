<script>
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;

  let showUserMenu = false;
  let globalData;
  
  function initOrReset() {
    $currentUser = data.currentUser;
    globalData = data.globalData || { cta: undefined };
    $isEditing = false;
  }
  
  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }
  
  async function saveGlobalSettings() {
    try {
      // Only persist when logged in as an admin
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-global', {
          globalData
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
  <title>Global Settings</title>
  <meta name="description" content="Edit global website settings" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={saveGlobalSettings}>
  <PrimaryButton on:click={toggleEdit}>Edit global settings</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<div class="py-12 sm:py-24">
  <div class="max-w-screen-xl mx-auto px-6">
    <h1 class="text-4xl md:text-5xl font-bold pb-8">Global Settings</h1>
    <p class="text-xl mb-8">Edit components that appear across multiple pages.</p>
    
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Call to Action Section</h2>
      <p class="mb-4">This section appears at the bottom of blog posts and other pages.</p>
      <EditableWebsiteTeaser bind:cta={globalData.cta} />
    </div>
  </div>
</div>

<Footer counter="/global-settings" />
