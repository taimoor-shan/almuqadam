<script>
  import '@fontsource/jost/400.css';
  import '@fontsource/jost/500.css';
  import '@fontsource/jost/600.css';
  import '@fontsource/jost/700.css';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  injectAnalytics();
  import '../app.css';
  import {
    globalPhone,
    globalEmail,
    globalAddress,
    globalFacebookUrl,
    globalTwitterUrl,
    globalInstagramUrl,
    globalTiktokUrl
  } from '$lib/stores.js';
  import Preloader from '$lib/components/Preloader.svelte';
  import { onNavigate } from '$app/navigation';

  export let data;

  // Handle page transitions with View Transitions API
  onNavigate((navigation) => {
    // @ts-expect-error - View Transitions API types don't exist yet
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      // @ts-expect-error - View Transitions API types don't exist yet
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  // Update global stores with data from layout.server.js
  $: if (data?.globalData) {
    $globalPhone = data.globalData.phone || '';
    $globalEmail = data.globalData.email || '';
    $globalAddress = data.globalData.address || '';
    $globalFacebookUrl = data.globalData.facebookUrl || '';
    $globalTwitterUrl = data.globalData.twitterUrl || '';
    $globalInstagramUrl = data.globalData.instagramUrl || '';
    $globalTiktokUrl = data.globalData.tiktokUrl || '';
  }
</script>

<Preloader />
<slot />
