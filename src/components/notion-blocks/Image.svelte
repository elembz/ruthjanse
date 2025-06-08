<script lang='ts'>
  import {getImage} from '~/lib/image-context';

  const {block} = $props()
  const image  = getImage(block.id)
</script>

<img src={`/images/${block.id}`} width={image?.width} height={image?.height} alt=''/>

<style>
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>