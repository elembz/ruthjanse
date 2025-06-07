
import config from '~/config'
import notion from './notion'
import type {DocumentLink, SerializedDocument} from '../types'
import {notionBlocksToPlainText} from '../util'
import {Image} from './image'

export class Document {

  public id!:     string
  public title?:  string
  public year?:   number
  public link?:   DocumentLink
  public blocks?: any[]
  public images?: Image[]

  static serializable: Array<keyof Document> = ['id', 'title', 'year', 'link', 'blocks', 'images']

  private constructor(raw: Record<string, unknown>) {
    Object.assign(this, raw)
  }

  static async get(id: string): Promise<Document | null> {
    try {
      const page      = await notion.pages.retrieve({page_id: id})
      const blocks    = await notion.blocks.children.list({block_id: id})

      const document  = await Document.fromNotionPage(page, blocks.results)

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

  public serialize(): SerializedDocument {
    const result: Record<string, unknown> = {}
    for (const key of Document.serializable) {
      result[key] = this[key]
    }
    result.images = this.images?.map(({id, width, height}) => ({id, width, height}))
    return result as unknown as SerializedDocument
  }

  static async fromNotionPage(notionPage: any, blocks?: any[]): Promise<Document> {
    const {id, properties} = notionPage

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