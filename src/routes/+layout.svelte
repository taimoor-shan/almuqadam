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
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  export let data;

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Basic animations for page elements
    gsap.from('.hero-image-wrap', { 
      opacity: 0, 
      y: 50, 
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.from('h1', { 
      opacity: 0, 
      y: 30, 
      duration: 0.8, 
      delay: 0.3,
      ease: 'power2.out'
    });
    
    gsap.from('p', { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Animate sections as they come into view
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  });

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

<!-- WhatsApp Sticky Button -->
<a 
  href={`https://wa.me/${$globalPhone?.replace(/\D/g, '')}`} 
  class="whatsapp-button"
  aria-label="Chat on WhatsApp"
  target="_blank" 
  rel="noopener noreferrer"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<style>
  .whatsapp-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transition: all 0.3s ease;
  }

  .whatsapp-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
  }

  .whatsapp-button svg {
    width: 30px;
    height: 30px;
  }
</style>
