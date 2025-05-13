<script>
  import PlainText from './PlainText.svelte';
  import Image from './Image.svelte';
  import { isEditing } from '$lib/stores.js';
  import Icon from '@iconify/svelte';

  // Props for the component
  export let icon = '';
  export let title = '';
  export let description = '';

  // Custom event
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Function to handle delete
  function handleDelete() {
    dispatch('delete');
  }
</script>

<div class="why-choose-item">
  {#if $isEditing}
    <button class="delete-button" on:click={handleDelete}>
      <Icon icon="mdi:delete" width="16" height="16" />
    </button>
  {/if}

  <Image
    src={icon}
    loading="eager"
    alt={title}
    class="why-choose-icon"
    maxWidth="64"
    maxHeight="64"
    quality="1"
  />
  <div>
    <h3 class="why-choose-title-two">
      <PlainText bind:content={title} />
    </h3>
    <p class="no-margin">
      <PlainText bind:content={description} />
    </p>
  </div>
</div>

<style>
  .why-choose-item {
    position: relative;
  }

  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff5252;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .delete-button:hover {
    opacity: 1;
  }
</style>
