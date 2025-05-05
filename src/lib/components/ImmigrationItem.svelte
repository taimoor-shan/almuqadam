<script>
  // Simple Svelte 5 component
  import PlainText from './PlainText.svelte';
  import Icon from "@iconify/svelte";

  // Export props
  export let service;
</script>


  <div class="flex">
    <Icon class="text-blue-600" icon="lets-icons:check-fill" width="24" height="24" />
      <p class="text-black ms-2">
        <PlainText bind:content={service.title} />
      </p>
  </div>

