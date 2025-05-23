<script>
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import {
    currentUser,
    isEditing,
    globalPhone,
    globalEmail,
    globalAddress,
    globalFacebookUrl,
    globalTwitterUrl,
    globalInstagramUrl,
    globalTiktokUrl
  } from '$lib/stores.js';
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
      address: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      tiktokUrl: ''
    };

    // Update global stores
    $globalPhone = globalData.phone || '';
    $globalEmail = globalData.email || '';
    $globalAddress = globalData.address || '';
    $globalFacebookUrl = globalData.facebookUrl || '';
    $globalTwitterUrl = globalData.twitterUrl || '';
    $globalInstagramUrl = globalData.instagramUrl || '';
    $globalTiktokUrl = globalData.tiktokUrl || '';

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

    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Global Contact Information</h2>
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

    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Social Media Links</h2>
      <p class="mb-4">These links appear in the footer and other locations throughout the site. Leave blank to hide the icon.</p>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
          <label for="facebookUrl" class="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
          <input
            type="url"
            id="facebookUrl"
            bind:value={globalData.facebookUrl}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://facebook.com/yourbusiness"
          />
        </div>

        <div class="mb-6">
          <label for="instagramUrl" class="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
          <input
            type="url"
            id="instagramUrl"
            bind:value={globalData.instagramUrl}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://instagram.com/yourbusiness"
          />
        </div>

        <div class="mb-6">
          <label for="twitterUrl" class="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
          <input
            type="url"
            id="twitterUrl"
            bind:value={globalData.twitterUrl}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://twitter.com/yourbusiness"
          />
        </div>

        <div class="mb-6">
          <label for="tiktokUrl" class="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
          <input
            type="url"
            id="tiktokUrl"
            bind:value={globalData.tiktokUrl}
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="https://tiktok.com/@yourbusiness"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<Footer counter="/global-settings" />
