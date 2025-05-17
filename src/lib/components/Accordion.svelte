<script>
  import AccordionItem from './AccordionItem.svelte';
  import { onMount } from 'svelte';

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
    items.forEach(item => {
      html += `<h2>${item.title}</h2>${item.content}`;
    });
    return html;
  }

  // Update items when faqsHtml changes
  $: if (typeof window !== 'undefined') {
    items = parseHtmlToItems(faqsHtml);
  }

  // Initialize on mount
  onMount(() => {
    console.log('Accordion mounted, faqsHtml:', faqsHtml);
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
        <AccordionItem
          title={item.title}
          content={item.content}
          isOpen={openIndex === i}
          index={i}
          toggle={handleToggle}
        />
      {/each}
    </div>
  </div>
</section>
