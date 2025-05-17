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
  <a aria-label="link" href={`/countries/${country.slug}`} class="country-item w-inline-block">
    <div class="country-image-wrap">
      <!-- <img
        src="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677fb6688fe8cea59e4ef083_malaysia-image.avif"
        loading="eager"
        style="-webkit-transform:translate3d(0, 0, 0) scale3d(1.01, 1.01, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1.01, 1.01, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1.01, 1.01, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1.01, 1.01, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
        alt=""
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        srcset="https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677fb6688fe8cea59e4ef083_malaysia-image-p-500.avif 500w, https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/677fb6688fe8cea59e4ef083_malaysia-image.avif 770w"
        class="country-image"
      /> -->
      <Image
        class="country-image"
        maxWidth="770"
        maxHeight="600"
        quality="1"
        src={country.featured_image || '/images/person-placeholder.jpg'}
        alt={country.title}
      />

       <Image
        class="country-image"
        maxWidth="100"
        maxHeight="200"
        quality="1"
        src={country.flag || '/images/person-placeholder.jpg'}
        alt={country.title}
      />
     
      <div class="country-image-overlay"></div>
    </div>
    <h2 class="country-title">{country.title}</h2>
  </a>
</div>
