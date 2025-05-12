<script>
  import EditableVisaService from './EditableVisaService.svelte';
  import { isEditing } from '$lib/stores.js';
  import SecondaryButton from './SecondaryButton.svelte';

  // Export props
  export let services = [];

  // Functions to manage services
  function addService() {
    services.push({
      image: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677e7240e3e34d7fa6783b18_service-01.avif",
      title: "New Visa Service",
      description: "Add a description for this visa service.",
      link: "#"
    });
    services = services; // trigger update
  }

  function deleteService(index) {
    services.splice(index, 1);
    services = services; // trigger update
  }

  function moveService(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < services.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = services.splice(index, 1)[0];
    // Insert at new position
    services.splice(toIndex, 0, element);
    services = services; // trigger update
  }
</script>

<div class="grid grid-visa-inline">
  {#each services as service, i}
    <div class="">
      <div class="immigration-collection-list-wrapper w-dyn-list">
        <div role="list" class="immigration-collection-list w-dyn-items">
          <div role="listitem" class="immigration-collection-item w-dyn-item">
            <EditableVisaService bind:service />
            
            {#if $isEditing}
              <div class="flex justify-end mt-2 space-x-2">
                <button
                  class="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  on:click={() => moveService(i, 'up')}
                  disabled={i === 0}
                  title="Move up"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <button
                  class="p-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  on:click={() => moveService(i, 'down')}
                  disabled={i === services.length - 1}
                  title="Move down"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button
                  class="p-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
                  on:click={() => deleteService(i)}
                  title="Delete service"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

{#if $isEditing}
  <div class="text-center mt-4">
    <SecondaryButton on:click={addService}>Add Visa Service</SecondaryButton>
  </div>
{/if}
