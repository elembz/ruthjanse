<script lang="ts">
  import NotionBlock from '~/components/NotionBlock.svelte';
	import type { PageProps } from './$types'
  import SiteHeader from '~/components/SiteHeader.svelte';

  const {data}: PageProps = $props()
  const document = data.document
</script>

<svelte:head>
  <title>{document.title}</title>
</svelte:head>

<SiteHeader/>


<main>
  <header>
    <h1>{document.title}</h1>
    <div class="metadata">
      {#if document.year != null}
        <time datetime={document.year.toString()}>
          {document.year}
        </time>
      {/if}
      {#if document.link != null}
        <a href={document.link.url} target="_blank" rel="noopener noreferrer">
          {document.link.description ?? 'Link'}
          </a>
      {/if}
    </div>
  </header>
  <div class="content">
    {#if document.blocks}
      {#each document.blocks as block}
        <NotionBlock {block} />
      {/each}
    {/if}
  </div>
</main>


<style>
  h1 {
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
    padding-bottom: 0.5em;
  }

  .metadata {
    font-size: 0.9em;
    padding-bottom: 1em;

    *:not(:last-child)::after {
      content: ' | ';
    }
  }

  main {
    max-width: var(--container-width);
    align-self: center;
  }

  .content {
    line-height: 1.6;
  }
</style>