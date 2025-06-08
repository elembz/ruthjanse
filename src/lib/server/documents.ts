
import config from '~/config'
import notion from './notion'
import type {DocumentLink, SerializedDocument} from '../types'
import {notionBlocksToPlainText} from '../util'
import {Image} from './image'
import {Logger} from './logger'

const logger = new Logger('Document')

export class Document {

  public id!:     string
  public title?:  string
  public year?:   number
  public link?:   DocumentLink
  public blocks?: any[]
  public images?: Image[]

  private constructor(raw: Record<string, unknown>) {
    Object.assign(this, raw)
  }

  static cache: Map<string, Document> = new Map()

  static async get(id: string): Promise<Document | null> {
    if (Document.cache.has(id)) {
      logger.info("Resolved cached document", id)

      // Return the cached version of the document, but fetch it again
      // so the latest version is returned with the next request.
      Document.fetch(id)
      return Document.cache.get(id)!
    }
    return Document.fetch(id)

  }

  private static async fetch(id: string): Promise<Document | null> {
    try {
      const page   = await notion.pages.retrieve({page_id: id})
      const blocks = await notion.blocks.children.list({block_id: id})

      const document = await Document.fromNotionPage(page, blocks.results)
      Document.cache.set(id, document)
      logger.info("Cached document", id)
      return document
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
      return null
    }
  }

  static async list(): Promise<Document[]> {
    try {
      const pages = await notion.databases.query({
        database_id: config.notion.databaseID,
        sorts:       [{property: 'Year', direction: 'descending'}],
      })
      return await Promise.all(
        pages.results.map(page => Document.fromNotionPage(page)),
      )
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
      return []
    }
  }

  static serializable: Array<keyof Document> = ['id', 'title', 'year', 'link', 'blocks', 'images']

  public serialize(): SerializedDocument {
    const result: Record<string, unknown> = {}
    for (const key of Document.serializable) {
      result[key] = this[key]
    }
    result.images = this.images?.map(it => it.serialize())
    return result as unknown as SerializedDocument
  }

  static async fromNotionPage(page: any, blocks?: any[]): Promise<Document> {
    const {id, properties} = page

    const title = notionBlocksToPlainText(properties['Name'].title)
    const year = properties['Year'].number ?? undefined
    const url  = properties['Link'].url ?? undefined
    const linkDescription = notionBlocksToPlainText(properties['Link description'].rich_text)
    const link = url == null ? undefined : {
      url: url,
      description: linkDescription === '' ? undefined : linkDescription,
    }

    const imageBlocks = blocks?.filter(it => it.type === 'image')
    const images      = imageBlocks == null ? undefined : await Promise.all(
      imageBlocks?.map(block => Image.fromNotionBlock(block))
    )

    return new Document({id, title, year, link, blocks, images})
  }

}