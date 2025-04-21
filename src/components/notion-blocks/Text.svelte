<script lang="ts">
  const { block } = $props();

  const lines = block.text.content.split('\n')
</script>

{#snippet text()}
  {#each lines as line, i}
    {#if i > 0}
      <br />
    {/if}
    {line}
  {/each}
{/snippet}

{#if block.annotations.bold}
  <strong>{@render text()}</strong>
{:else if block.annotations.italic}
  <em>{@render text()}</em>
{:else if block.annotations.underline}
  <u>{@render text()}</u>
{:else if block.annotations.strikethrough}
  <s>{@render text()}</s>
{:else}
  {@render text()}
{/if}