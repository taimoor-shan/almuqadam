<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let images = [];
  export let currentIndex = 0;
  export let isOpen = false;

  // Close the lightbox
  function close() {
    isOpen = false;
  }

  // Navigate to the previous image
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = images.length - 1; // Loop to the end
    }
  }

  // Navigate to the next image
  function next() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop to the beginning
    }
  }

  // Handle keyboard events
  function handleKeydown(e) {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowRight':
        next();
        break;
    }
  }

  // Prevent scrolling when lightbox is open
  onMount(() => {
    if (browser) {
      document.addEventListener('keydown', handleKeydown);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Cleanup
  onDestroy(() => {
    if (browser) {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    }
  });

  // Update body overflow when isOpen changes
  $: if (browser) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

{#if isOpen}
  <div
    class="bento-lightbox-backdrop"
    on:click|self={close}
    on:keydown={(e) => e.key === 'Escape' && close()}
    role="dialog"
    aria-modal="true"
    tabindex="0"
  >
    <div class="bento-lightbox-container">
      <div class="bento-lightbox-content">
        <div class="bento-lightbox-view">
          <div class="bento-lightbox-frame">
            <figure class="bento-lightbox-figure">
              {#if images[currentIndex]}
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
                  class="bento-lightbox-image"
                />
              {/if}
            </figure>
          </div>
        </div>

        <!-- Controls -->
        <button
          class="bento-lightbox-control bento-lightbox-left"
          on:click|stopPropagation={prev}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="-20 0 24 40">
            <g transform="rotate(45)">
              <path d="m0 0h5v23h23v5h-28z" opacity=".4"/>
              <path d="m1 1h3v23h23v3h-26z" fill="#fff"/>
            </g>
          </svg>
        </button>

        <button
          class="bento-lightbox-control bento-lightbox-right"
          on:click|stopPropagation={next}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="-4 0 24 40">
            <g transform="rotate(45)">
              <path d="m0-0h28v28h-5v-23h-23z" opacity=".4"/>
              <path d="m1 1h26v26h-3v-23h-23z" fill="#fff"/>
            </g>
          </svg>
        </button>

        <button
          class="bento-lightbox-control bento-lightbox-close"
          on:click|stopPropagation={close}
          aria-label="Close lightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="-4 0 18 17">
            <g transform="rotate(45)">
              <path d="m0 0h7v-7h5v7h7v5h-7v7h-5v-7h-7z" opacity=".4"/>
              <path d="m1 1h7v-7h3v7h7v3h-7v7h-3v-7h-7z" fill="#fff"/>
            </g>
          </svg>
        </button>

        <!-- Image counter -->
        <div class="bento-lightbox-caption">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom lightbox styles that don't conflict with existing classes */
  .bento-lightbox-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .bento-lightbox-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bento-lightbox-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bento-lightbox-view {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .bento-lightbox-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .bento-lightbox-figure {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .bento-lightbox-image {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
  }

  .bento-lightbox-control {
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    border: none;
    width: 4em;
    height: 100%;
    transition: opacity 0.3s;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bento-lightbox-control:hover {
    opacity: 1;
  }

  .bento-lightbox-left {
    left: 0;
    top: 0;
    bottom: 0;
  }

  .bento-lightbox-right {
    right: 0;
    top: 0;
    bottom: 0;
  }

  .bento-lightbox-close {
    top: 0;
    right: 0;
    width: 2.6em;
    height: 2.6em;
  }

  .bento-lightbox-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5em 1em;
    text-align: center;
  }

  @media (min-width: 768px) {
    .bento-lightbox-left,
    .bento-lightbox-right {
      opacity: 0.5;
    }

    .bento-lightbox-close {
      opacity: 0.8;
    }
  }
</style>
