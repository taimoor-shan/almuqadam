<script>
  import { isEditing } from '$lib/stores.js';
  import Image from './Image.svelte';
  import SecondaryButton from './SecondaryButton.svelte';
  import { classNames } from '$lib/util';
  import { onMount } from 'svelte';

  export let images = [];
  export let title = "Image Gallery";
  export let lightboxOpen = false;
  export let lightboxIndex = 0;

  let swiper;

  onMount(async () => {
    const swiperModule = await import('swiper');
    const swiperCore = swiperModule.default;
    const { Navigation, Pagination } = await import('swiper/modules');
    
    swiper = new swiperCore('.swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
          pagination: {
            enabled: false,
          },
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          navigation: {
            enabled: false,
          },
        }
      }
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  });

  // Function to add a new image
  function addImage() {
    images = [
      ...images,
      {
        src: '/images/person-placeholder.jpg',
        alt: 'New gallery image'
      }
    ];
  }

  // Function to delete an image
  function deleteImage(index) {
    images = images.filter((_, i) => i !== index);
  }

  // Function to move an image
  function moveImage(index, direction) {
    let newIndex;
    if (direction === 'up' && index > 0) {
      newIndex = index - 1;
    } else if (direction === 'down' && index < images.length - 1) {
      newIndex = index + 1;
    } else {
      return; // operation not possible
    }

    // Remove item from original position
    const element = images.splice(index, 1)[0];
    // Insert at new position
    images.splice(newIndex, 0, element);
    images = [...images]; // trigger update
  }

  // Function to open lightbox
  function openLightbox(index) {
    if (!$isEditing) {
      lightboxIndex = index;
      lightboxOpen = true;
    }
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</svelte:head>

<section class="gallery-slider-section section-spacing">
  <div class="container mx-auto px-6">
    <div class="section-title text-center mb-8 md:mb-12">
      <h2 class="">{title}</h2>
    </div>

    {#if images.length > 0}
      <div class="swiper-container">
        <div class="swiper-wrapper">
          {#each images as image, i}
            <div class="swiper-slide">
              <div 
                class="gallery-slide relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg aspect-[9/6]"
                on:click={() => openLightbox(i)}
                on:keypress={(e) => e.key === 'Enter' && openLightbox(i)}
                role="button"
                tabindex="0"
              >
                <Image
                  class="w-full h-full object-cover"
                  maxWidth="1024"
                  maxHeight="512"
                  quality="1"
                  bind:src={image.src}
                  alt={image.alt || `Gallery image ${i+1}`}
                />

                {#if $isEditing}
                  <div class="absolute top-2 right-2 flex flex-col space-y-2 z-10">
                    {#if i > 0}
                      <button
                        class="w-8 h-8 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                        on:click|stopPropagation={() => moveImage(i, 'up')}
                        aria-label="Move up"
                      >
                        ↑
                      </button>
                    {/if}

                    {#if i < images.length - 1}
                      <button
                        class="w-8 h-8 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                        on:click|stopPropagation={() => moveImage(i, 'down')}
                        aria-label="Move down"
                      >
                        ↓
                      </button>
                    {/if}

                    <button
                      class="w-8 h-8 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
                      on:click|stopPropagation={() => deleteImage(i)}
                      aria-label="Delete"
                    >
                      ×
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Navigation buttons -->
        <div class="swiper-button-next custom-nav-button"></div>
        <div class="swiper-button-prev custom-nav-button"></div>
        
        <!-- Pagination dots -->
        <div class="swiper-pagination"></div>
      </div>
    {:else}
      <div class="text-center py-12 bg-gray-100 rounded-lg">
        <p class="text-gray-500">No images in the gallery yet.</p>
      </div>
    {/if}

    {#if $isEditing}
      <div class="text-center mt-6">
        <SecondaryButton on:click={addImage}>Add image</SecondaryButton>
      </div>
    {/if}
  </div>
</section>

<style>
  .gallery-slide {
    height: 100%;
  }
  
  :global(.swiper-container) {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  :global(.swiper-slide) {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  :global(.custom-nav-button) {
    color: #ffffff!important;
    top:56% !important;
    background-color:var(--color--prime) !important;
    padding: 4px;
  }
  
  :global(.custom-nav-button::after) {
    font-size: 24px !important;
    font-weight: bold !important;
  }
  
  :global(.swiper-pagination-bullet-active) {
    background-color: var(--color--prime) !important;
  }

 :global(.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction) {
    bottom: var(--swiper-pagination-bottom,30px) !important;
}
</style>