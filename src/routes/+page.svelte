<script lang='ts'>
  import type { PageProps } from './$types'
  import NotionBlockList from '~/components/NotionBlockList.svelte'
  import DocumentList from '~/components/DocumentList.svelte'

  const {data}: PageProps = $props()
</script>

<svelte:head>
  <title>Ruth Janse</title>
  <meta name="description" content="Ruth Janse (1998) werkt bij het Leger des Heils, leest, schrijft, moestuiniert en wandelt met ezels om denken en doen in evenwicht te houden." />
</svelte:head>

<header>
  <NotionBlockList blocks={data.description}/>
</header>

<main>
  <DocumentList documents={data.documents}/>
</main>


<style>
  header {
    max-width: var(--container-width);
    flex-grow: 1;
    font-size: 1.25em;
    padding-bottom: 2em;
  }
</style>