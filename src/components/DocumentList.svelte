<script lang="ts">
  import type {SerializedDocument} from '~/lib/types';

  const {documents}: {documents: SerializedDocument[]} = $props()
</script>

{#each documents as document}
  <article>
    <h3>
      <a href="/documents/{document.id}">
        {document.title}
      </a>
    </h3>

    {#if document.year}
      <time datetime={document.year.toString()}>
        {document.year}
      </time>
    {/if}
  </article>
{/each}

<style>
  article {
    display: flex;
  }

  article:not(:last-child) {
    margin-bottom: 2em;
  }

  h3 {
    flex-grow: 1;
    font-size: 1em;
    font-weight: 500;
    margin: 0;
  }

  time {
    flex: 0 0 5em;
    text-align: right;
    font-family: monospace;
    font-size: 0.75em;
  }
</style>