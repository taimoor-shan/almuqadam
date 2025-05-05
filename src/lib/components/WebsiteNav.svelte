<script>
  import { classNames } from '$lib/util';
  import Modal from './Modal.svelte';
  import NotEditable from './NotEditable.svelte';
  import Search from './Search.svelte';
  import { isEditing, currentUser } from '$lib/stores.js';
  import { page } from '$app/stores';

  // TODO: Replace with a globally managed context menu implementation (only one active)
  export let showUserMenu = undefined;
  export let showSearch = undefined;

  // Function to check if a link is active
  function isActive(path) {
    // Exact match
    if ($page.url.pathname === path) return true;

    // Check if it's a nested route (e.g., /blog/some-post should highlight /blog)
    if (path !== '/' && $page.url.pathname.startsWith(path)) return true;

    return false;
  }

  function onKeyDown(e) {
    // Close modals
    if (e.key === 'Escape') {
      showSearch = false;
      showUserMenu = false;
    }
    // Trigger the search panel
    if (e.key === 'k' && e.metaKey) {
      showSearch = true;
    }
    // Turn on editing
    if (e.key === 'e' && e.metaKey) {
      $isEditing = true;
    }
  }
</script>

{#if showSearch}
  <Modal position="top" on:close={() => (showSearch = false)}>
    <Search bind:showSearch />
  </Modal>
{/if}

<!-- <div class="backdrop-blur-sm transition-colors duration-500 z-10 text-sm {$isEditing ? 'sticky top-0' : ''}">
  <div class="max-w-screen-md mx-auto px-6 py-4">
    <NotEditable>
      <div class="flex items-center relative">
        <div class="flex-1" />
        <button
          title="Search"
          aria-label="Search"
          class={classNames('mr-6 hover:text-black')}
          on:click={() => (showSearch = true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <a class="mr-4 font-medium px-2 py-1 rounded-md hover:text-black" href="/about"> About </a>
        <a class="mr-4 font-medium px-2 py-1 rounded-md hover:text-black" href="/blog"> Blog </a>
        <a class="mr-4 font-medium px-2 py-1 rounded-md hover:text-black" href="/#contact">
          Contact
        </a>
        <div class="flex-1" />
        {#if $currentUser}
          <button
            on:click={() => (showUserMenu = !showUserMenu)}
            class="ml-0 hover:text-black"
            title={$currentUser.name}
            aria-label="User menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        {/if}
        <div class="flex-1" />
      </div>
    </NotEditable>
  </div>
</div> -->
<div
  data-animation="default"
  data-collapse="medium"
  data-duration="400"
  data-easing="ease"
  data-easing2="ease"
  role="banner"
  class="navbar w-nav"
>
  <NotEditable>
    <div class="w-layout-blockcontainer container w-container">
      <div class="flex items-center relative justify-center">
        <!-- <a href="/" class="brand-wrap w-nav-brand">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778b72212f759419cce452a_visahub.svg"
            alt="Visahub logo"
            class="brand"
          />

         <h4 class="text-blue-700"> 509 Real Estate Services LLC</h4>
          </a
        >
        -->
        {#if $currentUser}
          <button
            on:click={() => (showUserMenu = !showUserMenu)}
            class="ml-0 hover:text-black"
            title={$currentUser.name}
            aria-label="User menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        {/if}
       
      </div>
    </div>
  </NotEditable>
</div>

<svelte:window on:keydown={onKeyDown} />
