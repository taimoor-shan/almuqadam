<script>
  import PlainText from './PlainText.svelte';
  import Image from './Image.svelte';
  import { isEditing } from '$lib/stores.js';
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';

  // Props for the component
  export let member = {
    name: '',
    position: '',
    bio: '',
    image: '',
    email: '',
    phone: ''
  };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Function to handle delete
  function handleDelete() {
    dispatch('delete');
  }
</script>

<div class="grid-agent-detail bg-gray-4">
  <div class="agent-detail-image-wrap">
    <Image
      bind:src={member.image}
      loading="eager"
      alt={member.name}
      class="agent-image"
      maxWidth="770"
      maxHeight="770"
      quality="1"
    />
  </div>
  <div class="agent-detail-content-wrap">
    <div class="cardHeader">
      <h4 class="agent-detail-title">
        <PlainText bind:content={member.name} />
      </h4>
      <div class="text-primary-1">
        <PlainText bind:content={member.position} />
      </div>
    </div>
    
    <p class="agent-detail-description">
      <PlainText bind:content={member.bio} />
    </p>
    <div class="agent-detail-info-list">
      <a href={`mailto:${member.email}`} class="agent-detail-contact-link">
        {#if $isEditing}
          <PlainText bind:content={member.email} />
        {:else}
          <Icon class="text-white" icon="mdi:email-outline" width="20" height="20" />
          <!-- {member.email || 'example@gmail.com'} -->
        {/if}
      </a>
      <a href={`tel:${member.phone}`} class="agent-detail-contact-link">
        {#if $isEditing}
          <PlainText bind:content={member.phone} />
        {:else}
          <Icon class="text-white" icon="mdi:phone-outline" width="20" height="20" />
          <!-- {member.phone || '+(251) 854-6308'} -->
        {/if}
      </a>
    </div>

    {#if $isEditing}
      <button class="delete-button" on:click={handleDelete}>
        <Icon icon="mdi:delete" width="16" height="16" />
      </button>
    {/if}
  </div>
</div>

<style>
  .delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
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

  .agent-detail-content-wrap {
    position: relative;
  }
</style>
