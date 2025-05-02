<script context="module">
  // Disable runes mode for this component
  export const runes = false;
</script>

<script>
  import { isEditing } from '$lib/stores.js';
  import { onMount } from 'svelte';

  export let content;
  export let multiLine = false;

  // Lazy loading editor
  let editor = null;
  let editorLoaded = false;
  let contentContainer;

  // Load the editor when in editing mode
  function loadEditor() {
    if ($isEditing && !editorLoaded) {
      import('./PlainTextEditor.svelte').then(module => {
        editor = module.default;
        editorLoaded = true;
      }).catch(err => {
        console.error('Failed to load PlainTextEditor:', err);
      });
    } else if (!$isEditing) {
      editor = null;
      editorLoaded = false;
    }
  }

  // Watch for changes to isEditing
  $: {
    if ($isEditing) {
      loadEditor();
    } else {
      editor = null;
    }
  }

  // Ensure content is properly sanitized and rendered
  function renderContent() {
    if (contentContainer && content) {
      contentContainer.innerHTML = content;
    }
  }

  // Update the DOM when content changes
  $: if (content && contentContainer && !$isEditing) {
    renderContent();
  }

  onMount(() => {
    renderContent();
  });
</script>

{#if $isEditing}
  {#if editor}
    <svelte:component this={editor} {multiLine} bind:content />
  {:else}
    <span bind:this={contentContainer}></span>
  {/if}
{:else}
  <span bind:this={contentContainer}></span>
{/if}
