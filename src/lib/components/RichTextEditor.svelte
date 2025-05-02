<script context="module">
  // Disable runes mode for this component
  export const runes = false;
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { toHTML, fromHTML } from '$lib/editor/prosemirrorUtil';
  import {
    singleLineRichTextSchema,
    multiLineRichTextSchema
  } from '$lib/editor/prosemirrorSchemas.js';
  import { activeEditorView } from '$lib/stores';
  import { EditorState, Plugin } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { history } from 'prosemirror-history';
  import { keymap } from 'prosemirror-keymap';
  import { baseKeymap } from 'prosemirror-commands';
  import { buildKeymap } from '$lib/editor/prosemirrorKeymap';
  import { buildInputRules } from '$lib/editor/prosemirrorInputrules';

  export let content = '<p>Enter text.</p>';
  export let multiLine = false;
  let editorChange = false;
  let prosemirrorNode, editorView, editorState;

  // Create schema based on multiLine prop
  function createSchema() {
    return multiLine ? multiLineRichTextSchema : singleLineRichTextSchema;
  }

  // Create editor state
  function createEditorState(schema, content) {
    const doc = fromHTML(schema, content);
    return EditorState.create({
      doc,
      schema,
      plugins: [
        buildInputRules(schema),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        history(),
        onUpdatePlugin
      ]
    });
  }

  // Update editor state when content or multiLine changes
  function updateEditorState() {
    const schema = createSchema();
    const newEditorState = createEditorState(schema, content);

    if (editorView && !editorChange) {
      editorView.updateState(newEditorState);
    } else {
      editorState = newEditorState;
      editorChange = false;
    }
  }

  // Initialize editor state
  $: {
    const schema = createSchema();
    if (!editorState) {
      editorState = createEditorState(schema, content);
    }
  }

  // Watch for changes to content or multiLine
  $: {
    if (content !== undefined && editorState) {
      updateEditorState();
    }
  }

  function dispatchTransaction(transaction) {
    const newState = this.state.apply(transaction);
    this.updateState(newState);
    if (transaction.docChanged) {
      content = toHTML(newState);
      // Leave a hint so we know the last content update came
      // from the editor (not the parent)
      editorChange = true;
    }
  }

  const onUpdatePlugin = new Plugin({
    view() {
      return {
        update(updatedView) {
          activeEditorView.set(updatedView);
        }
      };
    }
  });

  onMount(() => {
    if (prosemirrorNode && editorState) {
      editorView = new EditorView(prosemirrorNode, {
        state: editorState,
        dispatchTransaction
      });
      activeEditorView.set(editorView);
    }
  });

  onDestroy(() => {
    // Guard on server side
    if (editorView) {
      editorView.destroy();
    }
  });
</script>

<div id="prosemirror-editor" bind:this={prosemirrorNode}></div>

<style>
  :global(#prosemirror-editor .ProseMirror) {
    outline: none;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
