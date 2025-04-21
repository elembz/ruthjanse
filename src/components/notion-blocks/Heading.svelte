<script lang="ts">
  import NotionBlockList from '../NotionBlockList.svelte';

  const { block } = $props()
  const match  = block.type.match(/\d/)
  const level  = match[0]
  const blocks = block[block.type].rich_text
</script>

<svelte:element this={`h${level}`} class="heading">
  <NotionBlockList {blocks} />
</svelte:element>

<style>
  .heading {
    text-align: center;
    line-height: 1.25;
    font-weight: 500;
  }
</style>