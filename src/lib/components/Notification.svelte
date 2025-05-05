<script>
  import { onMount, createEventDispatcher } from 'svelte';

  export let type = 'success'; // success, error, info
  export let message = '';
  export let duration = 5000; // milliseconds
  export let show = false;

  const dispatch = createEventDispatcher();

  // Handle auto-close timer
  let timer;

  $: if (show && duration > 0) {
    clearTimeout(timer); // Clear any existing timer
    timer = setTimeout(() => {
      show = false;
      dispatch('close');
    }, duration);
  }

  // Clean up timer when component is destroyed
  onMount(() => {
    return () => {
      clearTimeout(timer);
    };
  });

  function handleClose() {
    show = false;
    dispatch('close');
  }
</script>

{#if show}
  <div
    class="fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ease-in-out"
    class:translate-y-0={show}
    class:opacity-100={show}
    class:-translate-y-4={!show}
    class:opacity-0={!show}
  >
    <div
      class="rounded-lg shadow-lg p-4 flex items-center justify-between"
      class:bg-green-600={type === 'success'}
      class:bg-red-600={type === 'error'}
      class:bg-blue-600={type === 'info'}
      class:text-white={true}
    >
      <div class="flex items-center">
        {#if type === 'success'}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        {:else if type === 'error'}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        {/if}
        <span>{message}</span>
      </div>
      <button
        class="ml-4 text-white hover:text-gray-200 focus:outline-none"
        on:click={handleClose}
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
{/if}
