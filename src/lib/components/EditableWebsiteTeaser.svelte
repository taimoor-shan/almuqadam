<script>
  import { classNames } from '$lib/util';
  import PrimaryButton from './PrimaryButton.svelte';
  import PlainText from './PlainText.svelte';
  import Image from './Image.svelte';
  import { isEditing } from '$lib/stores.js';

  // Default CTA data
  const CTA_DEFAULT = {
    title: 'Ready to start your',
    titleHighlight: 'immigration',
    titleEnd: 'journey?',
    buttonText: 'Schedule a free call',
    buttonUrl: '/contact',
    backgroundImage: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/677922fe8c4e46abad5e3388_vector-05.avif',
    features: [
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg',
        text: 'Tailored solutions'
      },
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg',
        text: 'Expert team'
      },
      {
        icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg',
        text: 'High approval rates'
      }
    ]
  };

  // Accept props from parent component or use defaults
  export let cta = CTA_DEFAULT;

  // Functions to manage features
  function addFeature() {
    cta.features.push({
      icon: 'https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/67792371323c341c6b28ca30_icon-11.svg',
      text: 'New feature'
    });
    cta = {...cta}; // trigger update
  }

  function deleteFeature(index) {
    cta.features.splice(index, 1);
    cta = {...cta}; // trigger update
  }

  function moveFeature(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < cta.features.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = cta.features.splice(index, 1)[0];
    // Insert at new position
    cta.features.splice(toIndex, 0, element);
    cta = {...cta}; // trigger update
  }
</script>

<section class="cta-section section-spacing">
  <div class="w-layout-blockcontainer container w-container">
    <div data-w-id="eb5f441a-d2c2-118b-d0a4-b31977d2e8cc" class="cta-wrap gradient-1">
      <div class="cta-content-wrap">
        <h2 class="cta-title">
          <PlainText bind:content={cta.title} />
          <span class="heading-serif"><PlainText bind:content={cta.titleHighlight} /></span>
          <PlainText bind:content={cta.titleEnd} />
        </h2>
        <div class="cta-feature-list">
          {#each cta.features as feature, i}
            <div class="cta-feature-list-item">
              <Image
                src={feature.icon}
                loading="eager"
                alt={`Icon for ${feature.text}`}
                class="cta-feature-list-icon"
                maxWidth="24"
                maxHeight="24"
              />
              <div>
                <PlainText bind:content={feature.text} />
              </div>

              {#if $isEditing}
                <div class="flex ml-2 space-x-1">
                  <button
                    class="w-5 h-5 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
                    on:click={() => deleteFeature(i)}
                    title="Delete feature"
                    aria-label="Delete feature"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === 0 ? 'opacity-20' : ''}`}
                    on:click={() => moveFeature(i, 'up')}
                    title="Move up"
                    aria-label="Move feature up"
                    disabled={i === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button
                    class={`w-5 h-5 p-1 rounded-full hover:bg-gray-100 ${i === cta.features.length - 1 ? 'opacity-20' : ''}`}
                    on:click={() => moveFeature(i, 'down')}
                    title="Move down"
                    aria-label="Move feature down"
                    disabled={i === cta.features.length - 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              {/if}
            </div>
          {/each}

          {#if $isEditing}
            <div class="text-center mt-2 w-full">
              <button
                class="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1"
                on:click={addFeature}
              >
                Add feature
              </button>
            </div>
          {/if}
        </div>

        {#if $isEditing}
          <div class="flex items-center mb-4">
            <span class="mr-2 text-white">Button URL:</span>
            <input
              type="text"
              bind:value={cta.buttonUrl}
              class="px-2 py-1 rounded text-sm flex-grow"
              placeholder="Enter URL (e.g., contact.html)"
            />
          </div>
        {/if}

        <a href={cta.buttonUrl} class="button-black w-button">
          <PlainText bind:content={cta.buttonText} />
        </a>
      </div>

      <Image
        src={cta.backgroundImage}
        loading="lazy"
        alt="Background vector image"
        class="vector-06"
        maxWidth="450"
        maxHeight="450"
      />
    </div>
  </div>
</section>
