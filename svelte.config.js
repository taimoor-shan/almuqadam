
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Adapter for Vercel deployment with specific configuration
    adapter: adapter({
      runtime: 'nodejs18.x',
      regions: ['iad1'],
      split: false
    }),
    csrf: {
      checkOrigin: false
    }
  },
  preprocess: vitePreprocess()
};

export default config;
