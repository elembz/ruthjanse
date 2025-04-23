<script lang='ts' module>
  import Heading from './notion-blocks/Heading.svelte'
  import Paragraph from './notion-blocks/Paragraph.svelte'
  import Text from './notion-blocks/Text.svelte'

  const blocks: Record<string,any> = {
    paragraph: Paragraph,
    text:      Text,
    heading_1: Heading,
    Heading2:  Heading,
    heading_3: Heading,
    heading_4: Heading,
    heading_5: Heading,
    heading_6: Heading,
  }
</script>

<script lang='ts'>
  const {block} = $props()
  const Component = blocks[block.type]
  if (Component == null) {
    console.warn(`No component found for block type: ${block.type}`)
  }
</script>

{#if Component != null}
  <Component block={block}/>
{/if}