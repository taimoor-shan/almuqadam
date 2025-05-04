
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Adapter for Netlify deployment with minimal configuration
    adapter: adapter(),
    csrf: {
      checkOrigin: false
    }
  },
  preprocess: vitePreprocess()
};

export default config;
