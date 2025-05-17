<script>
  import { extractTeaser, fetchJSON } from '$lib/util';
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import Country from '$lib/components/Country.svelte';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import Image from '$lib/components/Image.svelte';

  export let data;

  let showUserMenu = false,
    title = 'Country Name',
    content = 'Add detailed information about this country here.',
    featured_image = '/images/person-placeholder.jpg',
    flag = '/images/person-placeholder.jpg',
    cta;

  $: {
    $currentUser = data.currentUser;
    $isEditing = true;
    cta = data.globalData?.cta;
  }

  async function createCountry() {
    if (!$currentUser) {
      return alert('Sorry, you are not authorized to create new country pages.');
    }
    const teaser = extractTeaser(document.getElementById('country_content'));
    try {
      const { slug } = await fetchJSON('POST', '/api/create-country', {
        title,
        content,
        teaser,
        featured_image,
        flag
      });
      goto(`/countries/${slug}`);
    } catch (err) {
      console.error(err);
      alert('A country with that name has already been published. Choose a different name.');
    }
  }

  async function discardDraft() {
    goto('/countries');
  }
</script>

<svelte:head>
  <title>Add New Country | Almuqadam</title>
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={discardDraft} on:save={createCountry} />

<div class="pt-12 sm:pt-24 max-w-screen-md mx-auto px-6">
  <div class="font-bold text-sm">FEATURED IMAGE</div>
  <div class="mt-4 mb-8">
    <Image
      bind:src={featured_image}
      alt="Featured country image"
      maxWidth="1920"
      maxHeight="768"
      quality="1"
      class="w-full h-auto rounded-lg"
    />
  </div>

  <div class="font-bold text-sm mt-8">COUNTRY FLAG</div>
  <div class="mt-4 mb-8">
    <Image
      bind:src={flag}
      alt="Country flag"
      maxWidth="200"
      maxHeight="200"
      quality="1"
      class="w-auto h-auto rounded-full"
    />
  </div>
</div>

<Country bind:title bind:content bind:featured_image bind:flag />

<NotEditable>
  <EditableWebsiteTeaser bind:cta />
</NotEditable>

<Footer counter="/countries/new" />
