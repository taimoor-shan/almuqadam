
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Adapter for Netlify deployment with explicit output directory
    adapter: adapter({
      // Directory where the adapter will write files
      outDir: '.netlify/functions-internal'
    }),
    csrf: {
      checkOrigin: false
    }
  },
  preprocess: vitePreprocess()
};

export default config;
