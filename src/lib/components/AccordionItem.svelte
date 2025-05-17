<script>
  import PlainText from './PlainText.svelte';
  import RichText from './RichText.svelte';

  // Props
  let { title = '', content = '', isOpen = false, index = 0, toggle } = $props();

  // Toggle accordion item
  function toggleAccordion() {
    toggle?.({ index });
  }
</script>

<div class="accordion-wrap">
  <div class="accordion-heading" role="button" tabindex="0" onclick={toggleAccordion} onkeydown={(e) => e.key === 'Enter' && toggleAccordion()}>
    <h2 class="accordion-title" class:open={isOpen}>
      <PlainText bind:content={title} />
    </h2>
    <div class="accordion-line-wrap">
      <div class="accordion-line-hr"></div>
      <div class="accordion-line-vr" class:open={isOpen}></div>
    </div>
  </div>
  <div class="accordion-content-wrap" style={isOpen ? 'height: auto; opacity: 1; padding-top: 15px;' : 'height: 0px; opacity: 0; padding-top: 0;'}>
    <div class="accordion-content">
      <div class="no-margin">
        <RichText bind:content={content} />
      </div>
    </div>
  </div>
</div>

<style>
  .accordion-content-wrap {
    transition: height 0.3s ease, opacity 0.3s ease, padding-top 0.3s ease;
    overflow: hidden;
  }
</style>
