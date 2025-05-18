<script>
  import '@fontsource/jost/400.css';
  import '@fontsource/jost/500.css';
  import '@fontsource/jost/600.css';
  import '@fontsource/jost/700.css';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';
  import { globalPhone, globalEmail, globalAddress } from '$lib/stores.js';

  export let data;

  // Update global stores with data from layout.server.js
  $: if (data?.globalData) {
    $globalPhone = data.globalData.phone || '';
    $globalEmail = data.globalData.email || '';
    $globalAddress = data.globalData.address || '';
  }
</script>

<slot />
