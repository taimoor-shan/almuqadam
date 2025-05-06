<script>
  import BaseButton from '$lib/components/BaseButton.svelte';
  export let disabled = undefined;
  export let type = 'button';
  export let size = undefined;
  export let href = undefined;
</script>

<BaseButton
  {href}
  {type}
  {size}
  {disabled}
  styles="bg-blue-700 font-medium hover:bg-blue-800 focus:ring-gray-100 border-1 border-gray-700 text-white hover:text-white rounded-full"
  on:click
>
  <slot />
</BaseButton>
