<script>
  import { extractTeaser, fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import WebsiteNav from '$lib/components/WebsiteNav.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import Country from '$lib/components/Country.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import EditorToolbar from '$lib/components/tools/EditorToolbar.svelte';
  import { currentUser, isEditing } from '$lib/stores';

  export let data;

  let showUserMenu = false;
  let title, teaser, content, featured_image, published_at, updatedAt;
  let cta;

  $: {
    $currentUser = data.currentUser;
    initOrReset();
  }

  function initOrReset() {
    title = data.title;
    teaser = data.teaser;
    content = data.content;
    featured_image = data.featured_image;
    published_at = data.published_at;
    updatedAt = data.updatedAt;
    cta = data.globalData?.cta;
    $isEditing = false;
  }

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  async function deleteCountry() {
    if (!$currentUser) return alert('Sorry, you are not authorized.');
    try {
      fetchJSON('POST', '/api/delete-country', {
        slug: data.slug
      });
      goto('/countries');
    } catch (err) {
      console.error(err);
      alert('Error deleting the country. Try again.');
      window.location.reload();
    }
  }

  async function saveCountry() {
    if (!$currentUser) return alert('Sorry, you are not authorized.');
    const teaser = extractTeaser(document.getElementById('country_content'));
    try {
      const result = await fetchJSON('POST', '/api/update-country', {
        slug: data.slug,
        title,
        content,
        teaser,
        featured_image
      });
      updatedAt = result.updatedAt;
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert(
        'There was an error. You can try again, but before that, please just copy and paste your content into a safe place.'
      );
    }
  }
</script>

<svelte:head>
  <title>{title} | Almuqadam</title>
  <meta name="description" content={teaser} />
</svelte:head>

<EditorToolbar on:cancel={initOrReset} on:save={saveCountry} />
<WebsiteNav bind:showUserMenu />
{#if showUserMenu}
  <Modal on:close={() => (showUserMenu = false)}>
    <form class="w-full block" method="POST">
      <div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
        <PrimaryButton on:click={toggleEdit}>Edit country</PrimaryButton>
        <PrimaryButton type="button" on:click={deleteCountry}>Delete country</PrimaryButton>
        <LoginMenu />
      </div>
    </form>
  </Modal>
{/if}

<Country bind:title bind:content bind:featured_image bind:published_at />

<NotEditable>
  <EditableWebsiteTeaser bind:cta />
</NotEditable>

<Footer counter={`/countries/${data.slug}`} />
