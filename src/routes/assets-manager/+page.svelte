<script>
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores';
  import { fetchJSON } from '$lib/util';
  import WebsiteNav from '$lib/components/WebsiteNav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';

  export let data;

  // If we're on this page, we're definitely logged in (server-side check)
  // But we need to make sure the store is updated
  $: if (data.user && !$currentUser) {
    $currentUser = data.user;
  }

  let assets = [];
  let loading = true;
  let error = null;
  let showUserMenu = false;

  onMount(async () => {
    // We're definitely logged in if we're on this page
    await loadAssets();
  });

  async function loadAssets() {
    try {
      loading = true;
      assets = await fetchJSON('GET', '/api/assets');
      loading = false;
    } catch (err) {
      console.error('Error loading assets:', err);
      error = 'Failed to load assets. Please try again.';
      loading = false;
    }
  }

  async function deleteAsset(assetId) {
    if (!confirm(`Are you sure you want to delete this asset?`)) return;

    try {
      await fetchJSON('DELETE', '/api/assets', { asset_id: assetId });
      assets = assets.filter(asset => asset.asset_id !== assetId);
    } catch (err) {
      console.error('Error deleting asset:', err);
      alert('Failed to delete asset. Please try again.');
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
</script>

<svelte:head>
  <title>Asset Manager</title>
</svelte:head>

{#if showUserMenu}
  <Modal on:close={() => (showUserMenu = false)}>
    <div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
      <LoginMenu />
    </div>
  </Modal>
{/if}

<WebsiteNav bind:showUserMenu {currentUser} />

<div class="py-12 sm:py-24">
  <div class="max-w-screen-lg mx-auto px-6">
    <h1 class="text-4xl md:text-5xl font-bold pb-8">Asset Manager</h1>

    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    {:else if error}
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p>{error}</p>
        <button class="mt-2 text-sm underline" on:click={loadAssets}>Try again</button>
      </div>
    {:else if assets.length === 0}
      <div class="bg-gray-100 p-6 rounded-lg text-center">
        <p class="text-lg">No assets found.</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">Asset ID</th>
              <th class="py-2 px-4 border-b text-left">Type</th>
              <th class="py-2 px-4 border-b text-left">Size</th>
              <th class="py-2 px-4 border-b text-left">Last Updated</th>
              <th class="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each assets as asset}
              <tr class="hover:bg-gray-50">
                <td class="py-2 px-4 border-b">
                  <div class="truncate max-w-xs">{asset.asset_id}</div>
                </td>
                <td class="py-2 px-4 border-b">{asset.mime_type}</td>
                <td class="py-2 px-4 border-b">{formatSize(asset.size)}</td>
                <td class="py-2 px-4 border-b">{formatDate(asset.updated_at)}</td>
                <td class="py-2 px-4 border-b">
                  <div class="flex space-x-2">
                    <a href={`/assets/${asset.asset_id}`} target="_blank" class="text-blue-600 hover:underline">View</a>
                    <button
                      class="text-red-600 hover:underline"
                      on:click={() => deleteAsset(asset.asset_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<Footer counter="/assets-manager" />
