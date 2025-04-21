export function notionBlocksToPlainText(blocks: any[]) {
  const text: string[] = []
  for (const block of blocks) {
    if (block.type === 'paragraph') {
      text.push(notionBlocksToPlainText(block.paragraph.plain_text))
    } else if (block.type === 'text') {
      text.push(block.plain_text)
    }
  }
  return text.join('')
}