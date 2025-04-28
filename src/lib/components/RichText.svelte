<script context="module">
  // Disable runes mode for this component
  export const runes = false;
</script>

<script>
  import { isEditing } from '$lib/stores.js';

  export let content;
  export let multiLine = false;

  // Lazy loading editor
  let editor = null;

  $: if ($isEditing) {
    import('./RichTextEditor.svelte').then(module => {
      editor = module.default;
    });
  } else {
    editor = null;
  }
</script>

{#if $isEditing}
  {#if editor}
    <svelte:component this={editor} {multiLine} bind:content />
  {:else}
    {@html content}
  {/if}
{:else}
  <div>
    {@html content}
  </div>
{/if}
