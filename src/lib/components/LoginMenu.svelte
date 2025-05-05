<script>
  import PrimaryButton from './PrimaryButton.svelte';
  import { currentUser } from '$lib/stores.js';
</script>

<div>
  <div class="py-4 text-center">Signed in as {$currentUser.name}</div>
  <div class="flex flex-col">
    <form method="POST" action="/logout?/logout">
      <PrimaryButton type="submit">Sign out</PrimaryButton>
    </form>
  </div>
</div>
