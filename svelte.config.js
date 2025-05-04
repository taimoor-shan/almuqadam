
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Adapter for Netlify deployment
    adapter: adapter({
      // if true, will create a Netlify Edge Function
      edge: false,

      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app
      split: false
    }),
    csrf: {
      checkOrigin: false
    }
  },
  preprocess: vitePreprocess()
};

export default config;
