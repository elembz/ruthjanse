<script lang="ts">
  import NotionBlock from './NotionBlock.svelte'
  const {blocks} = $props()
</script>

{#each blocks as block}
  <NotionBlock block={block}/>
{/each}