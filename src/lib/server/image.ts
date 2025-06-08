import sharp from 'sharp'
import {Logger} from './logger'

const logger = new Logger('Image')

export class Image {

  public id!:      string
  public width!:   number
  public height!:  number
  public buffer!:  Buffer

  private constructor(raw: Record<string, unknown>) {
    Object.assign(this, raw)
  }

  public static readonly cache: Map<string, Image> = new Map()

  private static async store(id: string, url: string): Promise<Image> {
    const response    = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer      = Buffer.from(arrayBuffer)
    const image       = sharp(buffer)

    const {width, height} = await image.metadata()
    const result = new Image({id, width, height, buffer: image.toBuffer()})

    this.cache.set(id, result)
    return result
  }

  static async fromNotionBlock(block: any): Promise<Image> {
    const id = block.id
    if (this.cache.has(id)) {
      logger.info("Resolved cached image", id)
      return this.cache.get(id)!
    } else {
      logger.info("Caching image", id)
      return Image.store(id, block.image.file.url)
    }
  }

  public serialize() {
    const {id, width, height} = this
    return {id, width, height}
  }

}