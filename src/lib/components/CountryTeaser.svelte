<script>
  export let country;
  export let firstEntry;
  import { classNames } from '$lib/util';
  import SecondaryButton from './SecondaryButton.svelte';
  import Image from './Image.svelte';
</script>

<!-- <div>
  <div
    class={classNames(
      'max-w-screen-md mx-auto px-6 md:text-xl',
      firstEntry ? 'pt-2 pb-8 sm:pb-12' : 'py-6 sm:py-10'
    )}
  >
    <div class={classNames(country.published_at ? '' : 'opacity-50')}>
      <div class="country-item">
        <div class="country-image-wrap">
          <Image
            class="country-image"
            maxWidth="600"
            maxHeight="400"
            quality="0.9"
            src={country.featured_image || '/images/person-placeholder.jpg'}
            alt={country.title}
          />
          <div class="country-image-overlay"></div>
        </div>
        <div>
          <a
            class={classNames('mb-12 text-2xl md:text-3xl font-bold country-title')}
            href={`/countries/${country.slug}`}
          >
            {country.title}
          </a>
        </div>
        <div class="pt-2 pb-4">
          <div class="line-clamp-4">
            <a href={`/countries/${country.slug}`}>
              {country.teaser}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-2">
      <SecondaryButton size="sm" href={`/countries/${country.slug}`}>
        View country details&nbsp;→
      </SecondaryButton>
    </div>
  </div>
</div> -->

<div role="listitem" class="w-dyn-item">
  <a aria-label="link" href={`/countries/${country.slug}`} class="country-item w-inline-block !no-underline">
    <div class="country-image-wrap">
      <Image
        class="country-image"
        maxWidth="770"
        maxHeight="600"
        quality="1"
        src={country.featured_image || '/images/person-placeholder.jpg'}
        alt={country.title}
      />

       <Image
        class="country-flag"
        maxWidth="100"
        maxHeight="200"
        quality="1"
        src={country.flag || '/images/person-placeholder.jpg'}
        alt={country.title}
      />
    <h2 class="country-title border border-prime">{country.title}</h2>
      <div class="country-image-overlay"></div>
    </div>
  </a>
</div>
