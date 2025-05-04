import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { DATABASE_URL, ADMIN_PASSWORD, ORIGIN } from './netlify.js';

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    // Provide environment variables for the client
    'process.env.DATABASE_URL': JSON.stringify(DATABASE_URL),
    'process.env.ADMIN_PASSWORD': JSON.stringify(ADMIN_PASSWORD),
    'process.env.ORIGIN': JSON.stringify(ORIGIN)
  }
});
