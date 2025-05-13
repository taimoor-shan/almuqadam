<script>
  import PlainText from './PlainText.svelte';
  import Image from './Image.svelte';
  import { isEditing } from '$lib/stores.js';
  import { classNames } from '$lib/util';

  // Export props
  export let service = {
    image: '',
    title: '',
    description: '',
    link: ''
  };

  // Generate a unique ID for this component instance
  const serviceId = Math.random().toString(36).substring(2, 9);
</script>

<a data-w-id="visa-service-item" href={$isEditing ? undefined : service.link} class="immigration-item w-inline-block border hover:border-green-600">
  <div class="immigration-image-wrap">
    <Image
      bind:src={service.image}
      alt={service.title}
      class="immigration-image"
      maxWidth="600"
      maxHeight="400"
      quality="1"
    />
    <div class="immigration-arrow-wrap">
      <img
        src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b396/6778dc6f77d43b89f3c16ded_icon-05.svg"
        loading="eager"
        alt="Icon 05"
        class="immigration-arrow"
      />
    </div>
  </div>
  <div class="immigration-content">
    <h2 class="immigration-title text-heading">
      <PlainText bind:content={service.title} />
    </h2>
    <p class="no-margin">
      <PlainText bind:content={service.description} />
    </p>

    {#if $isEditing}
      <div class="mt-2">
        <label for="service-link-{serviceId}" class="text-sm text-gray-600 block">Link URL:</label>
        <input
          id="service-link-{serviceId}"
          type="text"
          bind:value={service.link}
          class="w-full p-1 text-sm border border-gray-300 rounded"
          placeholder="Enter URL (e.g., /services/visa.html)"
        />
      </div>
    {/if}
  </div>
</a>
