import fs from 'node:fs'
import path from 'path'
import sharp from 'sharp'
import config from '~/config'

const CACHED: Record<string, Image> = {}

export class Image {

  public id!:       string
  public width!:    number
  public height!:   number
  public fileName!: string

  private constructor(raw: Record<string, unknown>) {
    Object.assign(this, raw)
  }

  private static async store(id: string, url: string): Promise<Image> {
    const response    = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer      = Buffer.from(arrayBuffer)
    const image       = sharp(buffer)

    const {width, height} = await image.metadata()

    const fileName = `${id}.webp`
    const filePath = path.join(config.images.cacheDirectory, fileName)
    if (!fs.existsSync(filePath)) {
      await image.toFormat('webp', {quality: 50}).toFile(filePath)
    }

    CACHED[id] = new Image({id, width, height, fileName})
    return CACHED[id]
  }

  static async fromNotionBlock(block: any): Promise<Image> {
    const id = block.id
    const cached = CACHED[id]
    if (cached != null) {
      console.info("Resolved cached image", id)
      return cached
    } else {
      console.info("Caching image", id)
      return Image.store(id, block.image.file.url)
    }
  }

}