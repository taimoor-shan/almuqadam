<script>
  import { classNames } from '$lib/util';
  import { setBlockType } from 'prosemirror-commands';
  import { blockTypeActive } from '$lib/editor/prosemirrorUtil';
  import { onMount, createEventDispatcher } from 'svelte';

  export let editorView;
  export let editorState;

  let dropdownOpen = false;
  let dropdownRef;
  const dispatch = createEventDispatcher();

  $: schema = editorState.schema;
  $: disabled =
    !setBlockType(schema.nodes.heading)(editorState) &&
    !setBlockType(schema.nodes.paragraph)(editorState);
  
  $: isH1Active = blockTypeActive(schema.nodes.heading, { level: 1 })(editorState);
  $: isH2Active = blockTypeActive(schema.nodes.heading, { level: 2 })(editorState);
  $: isParagraphActive = !isH1Active && !isH2Active;

  function setHeadingLevel(level) {
    if (level === 0) {
      // Set to paragraph
      setBlockType(schema.nodes.paragraph)(editorState, editorView.dispatch);
    } else {
      // Set to heading with specified level
      setBlockType(schema.nodes.heading, { level })(editorState, editorView.dispatch);
    }
    editorView.focus();
    dropdownOpen = false;
  }

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleClickOutside(event) {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // Get the current active format for display
  $: activeFormat = isH1Active ? 'H1' : isH2Active ? 'H2' : 'Normal';
</script>

<div class="relative" bind:this={dropdownRef}>
  <button
    on:click={toggleDropdown}
    {disabled}
    class={classNames(
      (isH1Active || isH2Active) ? 'bg-gray-900 text-white' : 'hover:bg-gray-100',
      'sm:mx-1 rounded-full p-2 disabled:opacity-30 flex items-center'
    )}
  >
    <slot />
    <span class="ml-1 hidden sm:inline text-xs">{activeFormat}</span>
    <svg 
      class="w-2 h-2 ml-1" 
      fill="currentColor" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fill-rule="evenodd" 
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>

  {#if dropdownOpen}
    <div class="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div class="py-1" role="menu" aria-orientation="vertical">
        <button
          class={classNames(
            'block w-full text-left px-4 py-2 text-sm',
            isParagraphActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          )}
          role="menuitem"
          on:click={() => setHeadingLevel(0)}
        >
          Normal
        </button>
        <button
          class={classNames(
            'block w-full text-left px-4 py-2 text-sm font-bold',
            isH1Active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          )}
          role="menuitem"
          on:click={() => setHeadingLevel(1)}
        >
          Heading 1
        </button>
        <button
          class={classNames(
            'block w-full text-left px-4 py-2 text-sm font-semibold',
            isH2Active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          )}
          role="menuitem"
          on:click={() => setHeadingLevel(2)}
        >
          Heading 2
        </button>
      </div>
    </div>
  {/if}
</div>
