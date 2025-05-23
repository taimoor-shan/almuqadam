<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import Icon from '@iconify/svelte';
  import {
    globalPhone,
    globalEmail,
    globalAddress,
    globalFacebookUrl,
    globalTwitterUrl,
    globalInstagramUrl,
    globalTiktokUrl
  } from '$lib/stores.js';

  export let counter;
  let count;

  // Function to create a Google Maps URL from an address
  function getGoogleMapsUrl(address) {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  onMount(async () => {
    if (counter) {
      const result = await fetchJSON('GET', `/api/counter?c=${counter}`);
      count = result.count;
    }
  });
</script>

<NotEditable>
    <footer class="bg-accent pb-6 pt-8 lg:pt-10 border-t border-primary-1">
      <div class="mx-auto w-full max-w-screen-xl">
          <div class="md:flex md:justify-between">
            <div class=" w-full md:w-[50%] mb-6 md:mb-0">
              <a href="/" class="brand-wrap w-nav-brand inline-block">
                <img
                  loading="eager"
                  src="/images/AlMuqadamLogo.svg"
                  alt="AlMuqadam logo"
                  class="brand w-auto"
                /></a
              >
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 w-full md:w-[50%]">
                <div>
                    <h6 class="mb-6 text-primary-1">Navigation</h6>
                    <ul class="">
                        <li class="mb-4">
                            <a href="/" class="hover:underline">Home</a>
                        </li>
                        <li class="mb-4">
                            <a href="/about" class="hover:underline">About</a>
                        </li>
                        <li class="mb-4">
                            <a href="/countries" class="hover:underline">Countries</a>
                        </li>

                        <li class="mb-4">
                            <a href="/contact" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h6 class="mb-6 text-primary-1">Contact Us</h6>

                    <ul class="">
                        <li class="mb-4">
                            <a href={`mailto:${$globalEmail || 'info@almuqadam.com'}`} class="hover:underline">{$globalEmail || 'info@almuqadam.com'}</a>
                        </li>
                        <li class="mb-4">
                            <a href={`tel:${$globalPhone || '+44 7700 900123'}`} class="hover:underline">{$globalPhone || '+44 7700 900123'}</a>
                        </li>
                        <li class="mb-4">
                           <a href={$globalAddress ? getGoogleMapsUrl($globalAddress) : '/contact'} target="_blank" rel="noopener noreferrer">
                            {$globalAddress || '19 Ashwood Close, Greater London, United Kingdom'}
                           </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-4 border-gray-400 sm:mx-auto lg:my-6" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-dark sm:text-center">© 2025 <a href="/" class="hover:underline text-prime">Almuqadam</a>. All Rights Reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
                {#if $globalFacebookUrl}
                <a href={$globalFacebookUrl} class="text-dark hover:text-prime " target="_blank" rel="noopener noreferrer">
                    <Icon icon="mdi:facebook" width="20" height="20" />
                    <span class="sr-only">Facebook page</span>
                </a>
                {/if}

                {#if $globalInstagramUrl}
                <a href={$globalInstagramUrl} class="text-dark hover:text-prime  ms-5" target="_blank" rel="noopener noreferrer">
                    <Icon icon="mdi:instagram" width="20" height="20" />
                    <span class="sr-only">Instagram page</span>
                </a>
                {/if}

                {#if $globalTwitterUrl}
                <a href={$globalTwitterUrl} class="text-dark hover:text-prime  ms-5" target="_blank" rel="noopener noreferrer">
                    <Icon icon="mdi:twitter" width="20" height="20" />
                    <span class="sr-only">Twitter/X page</span>
                </a>
                {/if}

                {#if $globalTiktokUrl}
                <a href={$globalTiktokUrl} class="text-dark hover:text-prime  ms-5" target="_blank" rel="noopener noreferrer">
                    <Icon icon="ic:baseline-tiktok" width="20" height="20" />
                    <span class="sr-only">TikTok page</span>
                </a>
                {/if}
            </div>
        </div>
      </div>
  </footer>
</NotEditable>
