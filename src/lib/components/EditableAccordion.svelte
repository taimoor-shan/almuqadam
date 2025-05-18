<script>
  import AccordionItem from './AccordionItem.svelte';
  import { onMount } from 'svelte';
  import { isEditing } from '$lib/stores.js';
  import SecondaryButton from './SecondaryButton.svelte';
  import Icon from '@iconify/svelte';

  // Props
  export let title = 'Frequently <span class="heading-serif">asked</span> questions';
  export let faqsHtml = '';
  export let items = [];

  // Track which accordion item is open
  let openIndex = 0;

  // Handle toggle event from accordion item
  function handleToggle(event) {
    const { index } = event.detail;
    openIndex = openIndex === index ? -1 : index;
  }

  // Parse HTML content into accordion items
  function parseHtmlToItems(html) {
    if (!html) return [];

    // Handle both string and object inputs
    const htmlContent = typeof html === 'string' ? html : '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const questions = tempDiv.querySelectorAll('h2');
    const parsedItems = [];

    questions.forEach((question) => {
      const title = question.innerHTML;
      let content = '';

      // Get content until next h2 or end of content
      let nextElement = question.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'H2') {
        content += nextElement.outerHTML;
        nextElement = nextElement.nextElementSibling;
      }

      parsedItems.push({ title, content });
    });

    return parsedItems;
  }

  // Convert accordion items back to HTML
  export function itemsToHtml() {
    let html = '';
    console.log('Converting items to HTML:', items);
    items.forEach(item => {
      html += `<h2>${item.title}</h2>${item.content}`;
    });
    console.log('Generated HTML:', html);
    return html;
  }

  // Functions to manage accordion items
  function addAccordionItem() {
    items = [
      ...items,
      {
        title: 'New Question',
        content: '<p>Add your answer here.</p>'
      }
    ];
  }

  function removeAccordionItem(index) {
    items = items.filter((_, i) => i !== index);
  }

  function moveAccordionItem(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < items.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = items.splice(index, 1)[0];
    // Insert at new position
    items.splice(toIndex, 0, element);
    items = [...items]; // trigger update
  }

  // Flag to track if component is mounted
  let isMounted = false;

  // Update items when faqsHtml changes, but only before the component is mounted
  // or when faqsHtml is explicitly changed from outside
  $: if (typeof window !== 'undefined' && (!isMounted || faqsHtml !== itemsToHtml())) {
    console.log('Updating items from faqsHtml:', faqsHtml);
    items = parseHtmlToItems(faqsHtml);
  }

  // Initialize on mount
  onMount(() => {
    console.log('EditableAccordion mounted, faqsHtml:', faqsHtml);
    items = parseHtmlToItems(faqsHtml);

    // If no items were parsed and no default items were provided, add default items
    if (items.length === 0) {
      items = [
        {
          title: 'How long does the visa application process take?',
          content: '<p>The processing time depends on the visa type and the country you\'re applying to. It can range from a few weeks to several months. We provide accurate timelines during the consultation phase.</p>'
        },
        {
          title: 'What documents are required for a visa application?',
          content: '<p>Required documents vary by visa type but generally include a valid passport, proof of financial stability, and other relevant records like employment or study documents. We will guide you through the specific requirements for your application.</p>'
        }
      ];
    }

    // Set the mounted flag to prevent overriding items from faqsHtml
    isMounted = true;
    console.log('EditableAccordion mounted, items:', items);
  });
</script>

<section class="faqs-section section-spacing">
  <div class="w-layout-blockcontainer inner-container w-container">
    <div class="section-title text-center">
      <h2>
        {@html title}
      </h2>
    </div>
    <div class="accordion-list">
      {#each items as item, i}
        <div class="relative">
          <AccordionItem
            bind:title={item.title}
            bind:content={item.content}
            isOpen={openIndex === i}
            index={i}
            toggle={handleToggle}
          />

          {#if $isEditing}
            <div class="absolute top-6 right-0 flex space-x-2">
              <button
                class="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                on:click={() => moveAccordionItem(i, 'up')}
                disabled={i === 0}
                title="Move up"
              >
                <Icon icon="mdi:arrow-up" width="16" height="16" />
              </button>
              <button
                class="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                on:click={() => moveAccordionItem(i, 'down')}
                disabled={i === items.length - 1}
                title="Move down"
              >
                <Icon icon="mdi:arrow-down" width="16" height="16" />
              </button>
              <button
                class="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                on:click={() => removeAccordionItem(i)}
                title="Remove item"
              >
                <Icon icon="mdi:delete" width="16" height="16" />
              </button>
            </div>
          {/if}
        </div>
      {/each}

      {#if $isEditing}
        <div class="text-center mt-6">
          <SecondaryButton on:click={addAccordionItem}>
            <div class="flex items-center">
              <Icon icon="mdi:plus" width="16" height="16" class="mr-1" />
              Add Question
            </div>
          </SecondaryButton>
        </div>
      {/if}
    </div>
  </div>
</section>
