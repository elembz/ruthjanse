<script lang='ts'>
  import NotionBlock from './NotionBlock.svelte'
  const {blocks} = $props()
</script>

{#each blocks as block, index (index)}
  <NotionBlock block={block}/>
{/each}