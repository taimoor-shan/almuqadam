<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';

  export let counter;
  let count;

  onMount(async () => {
    if (counter) {
      const result = await fetchJSON('GET', `/api/counter?c=${counter}`);
      count = result.count;
    }
  });
</script>

<NotEditable>
  <footer class="footer bg-black py-10 px-4">
 
      
        <p class="text-white text-center w-full text-2xl md:text-5xl lg:text-8xl">
          509 Real Estate Services LLC
        </p>
    
  
  </footer>
</NotEditable>
