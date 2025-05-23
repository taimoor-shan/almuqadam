<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { classNames } from '$lib/util';
  import { isEditing, currentUser } from '$lib/stores.js';
  import Modal from './Modal.svelte';
  import NotEditable from './NotEditable.svelte';
  import Search from './Search.svelte';

  // TODO: Replace with a globally managed context menu implementation (only one active)
  export let showUserMenu = undefined;
  export let showSearch = undefined;

  // State for mobile menu
  let isMobileMenuOpen = false;

  // Toggle mobile menu
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    // Add/remove body class to prevent scrolling when menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  // Close mobile menu when a link is clicked
  function closeMenu() {
    isMobileMenuOpen = false;
    document.body.classList.remove('menu-open');
  }

  // Clean up on component unmount
  onMount(() => {
    return () => {
      // Make sure we remove the class when component is destroyed
      document.body.classList.remove('menu-open');
    };
  });

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
      isMobileMenuOpen = false;
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
      <div class="flex items-center relative justify-between">
        <a href="/" class="brand-wrap w-nav-brand">
          <img
            loading="eager"
            src="/images/AlMuqadamLogo.svg"
            alt="AlMuqadam logo"
            class="brand"
          /></a
        >
        <nav class={classNames("nav-menu w-nav-menu", isMobileMenuOpen ? "w--nav-menu-open" : "")}>
          <a
            href="/"
            class={classNames("nav-link w-nav-link", isActive('/') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            Home
          </a>
          <a
            href="/about"
            class={classNames("nav-link w-nav-link", isActive('/about') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            About Us
          </a>
          <a
            href="/countries"
            class={classNames("nav-link w-nav-link", isActive('/countries') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            Countries
          </a>
          <!-- Blog link removed -->
        </nav>
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
           <a
              href="/admin"
              class={classNames("nav-link w-nav-link underline", isActive('/admin') ? 'w--current' : '')}
              on:click={closeMenu}
            >
              Admin
            </a>
        {/if}
        <div class="cta flex gap-4">
          <div class="nav-right">
            <a
              href="/contact"
              class={classNames("button-black nav-button w-button", isActive('/contact') ? 'active-button' : '')}
              on:click={closeMenu}
            >
              Contact Us
            </a>
          </div>
          <button
            type="button"
            class={classNames("menu-button w-nav-button", isMobileMenuOpen ? "w--open" : "")}
            on:click={toggleMobileMenu}
            on:keydown={(e) => e.key === 'Enter' && toggleMobileMenu()}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div class="hamburger-icon">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    {#if isMobileMenuOpen}
      <div
        class="w-nav-overlay"
        on:click={closeMenu}
        on:keydown={(e) => e.key === 'Escape' && closeMenu()}
        role="dialog"
        tabindex="-1"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav class="nav-menu w-nav-menu w--nav-menu-open" data-nav-menu-open>
          <div class="mobile-menu-header">
            <button
              type="button"
              class="mobile-menu-close"
              on:click={closeMenu}
              on:keydown={(e) => e.key === 'Enter' && closeMenu()}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <a
            href="/"
            class={classNames("nav-link w-nav-link w--nav-link-open", isActive('/') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            Home
          </a>
          <a
            href="/about"
            class={classNames("nav-link w-nav-link w--nav-link-open", isActive('/about') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            About
          </a>

          <!-- Blog link removed -->
          <a
            href="/countries"
            class={classNames("nav-link w-nav-link w--nav-link-open", isActive('/countries') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            Countries
          </a>
          {#if $currentUser}
            <a
              href="/admin"
              class={classNames("nav-link w-nav-link underline", isActive('/admin') ? 'w--current' : '')}
              on:click={closeMenu}
            >
              Admin
            </a>
          {/if}
          <a
            href="/contact"
            class={classNames("nav-link w-nav-link w--nav-link-open", isActive('/contact') ? 'w--current' : '')}
            on:click={closeMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    {/if}
  </NotEditable>
</div>

<style>
  /* Custom styles for mobile menu */
  .w-nav-overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .w-nav-overlay .w-nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    padding: 30px 20px;
    background-color: var(--color--white);
    overflow-y: auto;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    animation: slideIn 0.3s ease forwards;
    margin: 0 !important;
    border-radius: 0 !important;
  }

  .w-nav-overlay .w-nav-link {
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid var(--color--secondary-1);
    display: block;
    width: 100%;
    color: var(--color--black);
    transition: color 0.2s ease, padding-left 0.2s ease;
  }

  .w-nav-overlay .w-nav-link:hover {
    color: var(--color--prime);
    padding-left: 5px;
  }

  .w-nav-overlay .w-nav-link.w--current {
    color: var(--color--prime);
    font-weight: 600;
  }

  .w-nav-overlay .w-nav-link:last-child {
    border-bottom: none;
  }

  /* Mobile menu header styles */
  .mobile-menu-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color--secondary-1);
  }

  .mobile-menu-close {
    background: transparent;
    border: none;
    color: var(--color--black);
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .mobile-menu-close:hover {
    color: var(--color--prime);
    transform: rotate(90deg);
  }

  /* Prevent body scrolling when menu is open */
  :global(body.menu-open) {
    overflow: hidden;
  }

  /* Hamburger icon styles */
  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    position: relative;
    transition: all 0.3s ease;
  }

  .hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color--black);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  /* Hamburger animation for open state */
  .w--open .hamburger-icon {
    transform: rotate(45deg);
  }

  .w--open .hamburger-line:nth-child(1) {
    transform: translateY(8px);
  }

  .w--open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .w--open .hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(90deg);
  }

  /* Menu button styles */
  .menu-button {
    display: none;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .menu-button:hover .hamburger-line {
    background-color: var(--color--prime);
  }

  /* Ensure hamburger button is visible on mobile */
  @media screen and (max-width: 991px) {
    .menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-menu:not(.w--nav-menu-open) {
      display: none;
    }
  }
</style>

<svelte:window on:keydown={onKeyDown} />
