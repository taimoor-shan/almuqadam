<script>
  import { isEditing } from '$lib/stores.js';
  import Image from './Image.svelte';
  import SecondaryButton from './SecondaryButton.svelte';
  import { classNames } from '$lib/util';

  export let images = [];
  export let title = "Image Gallery";
  export let lightboxOpen = false;
  export let lightboxIndex = 0;

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

<section class="bento-gallery-section py-12 md:py-24">
  <div class="container mx-auto px-6">
    <div class="section-title text-center mb-8 md:mb-12">
      <h2 class="">{title}</h2>
    </div>

    {#if images.length > 0}
      <div class="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {#each images as image, i}
          <div
            class={classNames(
              "bento-item relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg",
              i === 0 ? "md:col-span-2 md:row-span-2" : "",
              i === 3 ? "md:row-span-2" : "",
              i === 4 ? "md:col-span-2 md:row-span-2" : "",
              "aspect-square md:aspect-auto"
            )}
            on:click={() => openLightbox(i)}
            on:keypress={(e) => e.key === 'Enter' && openLightbox(i)}
            role="button"
            tabindex="0"
          >
            <Image
              class="w-full h-full object-cover"
              maxWidth="1200"
              maxHeight="800"
              quality="0.9"
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
        {/each}
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
