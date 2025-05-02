<script>
  import PlainText from './PlainText.svelte';
  import { classNames } from '$lib/util';
  import { createEventDispatcher, onMount } from 'svelte';
  import { isEditing } from '$lib/stores.js';

  const dispatch = createEventDispatcher();

  export let counter;
  export let firstEntry = false;
  export let lastEntry = false;

  // Parse the counter value to a number (removing any non-numeric characters)
  let numericValue = parseInt(counter.value.replace(/\D/g, '')) || 0;

  // For animation
  let displayValue = 0;
  let animationDuration = 2000; // 2 seconds
  let isAnimating = false;
  let hasAnimated = false; // Track if animation has already played
  let counterElement; // Reference to the counter element for Intersection Observer

  // Function to animate the counter
  function animateCounter(targetValue) {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      // If we're in SSR, just set the value directly
      displayValue = targetValue;
      return;
    }

    // If already animated or currently animating, don't start again
    if (hasAnimated || isAnimating) return;

    isAnimating = true;
    const startValue = displayValue;
    const startTime = window.performance.now();

    function updateValue(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Calculate current value
      displayValue = startValue + (targetValue - startValue) * easedProgress;

      if (progress < 1) {
        window.requestAnimationFrame(updateValue);
      } else {
        displayValue = targetValue;
        isAnimating = false;
        hasAnimated = true; // Mark as animated
      }
    }

    window.requestAnimationFrame(updateValue);
  }

  // Setup Intersection Observer to detect when counter is in viewport
  function setupIntersectionObserver() {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // If we're in SSR or IntersectionObserver is not supported, just set the value
      displayValue = numericValue;
      return;
    }

    const options = {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated && !$isEditing) {
          // Element is in viewport, start animation
          animateCounter(numericValue);
        }
      });
    }, options);

    // Start observing the counter element
    if (counterElement) {
      observer.observe(counterElement);
    }

    return () => {
      // Cleanup observer on component unmount
      if (counterElement) {
        observer.unobserve(counterElement);
      }
    };
  }

  // Start the animation when the component is mounted
  onMount(() => {
    if ($isEditing) {
      // If in edit mode, just set the value directly
      displayValue = numericValue;
    } else {
      // Set initial value to 0
      displayValue = 0;

      // Setup Intersection Observer
      const cleanup = setupIntersectionObserver();

      return cleanup; // Return cleanup function for onMount
    }
  });

  // Watch for changes to isEditing
  $: if (!$isEditing && !isAnimating && !hasAnimated) {
    // When exiting edit mode, update the numeric value
    numericValue = parseInt(counter.value.replace(/\D/g, '')) || 0;

    // Reset animation state when exiting edit mode
    hasAnimated = false;
    displayValue = 0;

    // Setup Intersection Observer again
    setupIntersectionObserver();
  }
</script>

<div class="about-counter-item" bind:this={counterElement}>
  <h3 class="about-counter-title">
    {#if $isEditing}
      <PlainText bind:content={counter.value} />
    {:else}
      {Math.round(displayValue)}
    {/if}
    <span class="text-primary-1">
      <PlainText bind:content={counter.suffix} />
    </span>
  </h3>
  <p class="no-margin">
    <PlainText bind:content={counter.description} />
  </p>

  {#if $isEditing}
    <div class="flex mt-2 space-x-2 justify-end">
      <button
        class="w-6 h-6 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
        on:click={() => dispatch('delete')}
        title="Delete counter"
        aria-label="Delete counter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        class={classNames(
          'w-6 h-6 p-1 rounded-full hover:bg-gray-100',
          firstEntry ? 'opacity-20' : ''
        )}
        on:click={() => dispatch('up')}
        title="Move up"
        aria-label="Move counter up"
        disabled={firstEntry}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <button
        class={classNames(
          'w-6 h-6 p-1 rounded-full hover:bg-gray-100',
          lastEntry ? 'opacity-20' : ''
        )}
        on:click={() => dispatch('down')}
        title="Move down"
        aria-label="Move counter down"
        disabled={lastEntry}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  {/if}
</div>
