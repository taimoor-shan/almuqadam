<script>
  // This component demonstrates Svelte 5 runes

  // State rune for counter
  let count = $state(0);

  // Derived state
  const doubled = $derived(count * 2);
  const squared = $derived(count * count);

  // Effect rune to log changes
  $effect(() => {
    console.log(`Count changed to ${count}`);
  });

  // Functions to update state
  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-4">Svelte 5 Runes Counter</h2>

  <div class="mb-4">
    <p class="text-lg">Current count: <span class="font-bold">{count}</span></p>
    <p>Doubled: <span class="font-bold">{doubled}</span></p>
    <p>Squared: <span class="font-bold">{squared}</span></p>
  </div>

  <div class="flex space-x-2">
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onclick={increment}
    >
      Increment
    </button>

    <button
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onclick={decrement}
    >
      Decrement
    </button>

    <button
      class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      onclick={reset}
    >
      Reset
    </button>
  </div>
</div>
