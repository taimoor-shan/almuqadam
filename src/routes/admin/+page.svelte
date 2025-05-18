<script>
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { currentUser, isEditing, globalPhone, globalEmail, globalAddress } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';

  export let data;

  let showUserMenu = false;
  let globalData;

  function initOrReset() {
    $currentUser = data.currentUser;
    globalData = data.globalData || {
      cta: undefined,
      phone: '',
      email: '',
      address: ''
    };

    // Update global stores
    $globalPhone = globalData.phone || '';
    $globalEmail = globalData.email || '';
    $globalAddress = globalData.address || '';

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
    <h1 class="text-center pb-8">Global Settings</h1>
    <div class="mb-10">
      <h4 class="mb-4">Global Contact Information</h4>
      <p class="mb-4">This information appears in the footer, contact page, and other locations throughout the site.</p>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            id="phone"
            bind:value={globalData.phone}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="+44 7700 900123"
          />
        </div>

        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            bind:value={globalData.email}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="info@almuqadam.com"
          />
        </div>

        <div class="mb-6">
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
          <textarea
            id="address"
            bind:value={globalData.address}
            class="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="19 Ashwood Close, Greater London, United Kingdom"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="">
      <h4 class=" mb-4">Call to Action Section</h4>
      <p class="mb-0">This section appears at the bottom of blog posts and other pages.</p>
      <EditableWebsiteTeaser bind:cta={globalData.cta} />
    </div>

    
  </div>
</div>

<Footer counter="/global-settings" />
