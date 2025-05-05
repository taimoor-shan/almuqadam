<script>
  import Limiter from '$lib/components/Limiter.svelte';

  export let form;
</script>

<Limiter>
  <div class="pt-20">
    {#if form?.incorrect}
      <p class="p-4 bg-red-100 text-red-600 my-4 rounded-md">Error while signing out.</p>
      <p class="mt-4">
        <a class="underline" href="/">Return to home page</a>
      </p>
    {:else}
      <p>Signing out...</p>
      <p>If you are not redirected automatically, <a href="/" class="underline">click here</a> to go to the home page.</p>
    {/if}
  </div>
</Limiter>
