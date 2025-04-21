<script lang="ts">
  import NotionBlockList from '../NotionBlockList.svelte';

  const { block } = $props()
  const blocks = block.paragraph.rich_text
</script>

<p>
  <NotionBlockList {blocks}/>
</p>