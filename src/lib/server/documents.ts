
import config from '~/config'
import notion from './notion'
import type {DocumentLink, SerializedDocument} from '../types'
import {notionBlocksToPlainText} from '../util'

export class Document {

  public id!:     string | null
  public title?:  string
  public year?:   number
  public link?:   DocumentLink
  public blocks?: any[]

  static serializable: Array<keyof Document> = ['id', 'title', 'year', 'link', 'blocks']

  private constructor(raw: Record<string, unknown>) {
    Object.assign(this, raw)
  }

  static async get(id: string): Promise<Document | null> {
    try {
      const page      = await notion.pages.retrieve({page_id: id})
      const blocks    = await notion.blocks.children.list({block_id: id})

      const document  = Document.fromNotionPage(page)
      document.blocks = blocks.results

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
      return pages.results.map(page => Document.fromNotionPage(page))
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
    return result as unknown as SerializedDocument
  }

  static fromNotionPage(notionPage: any): Document {
    const {id, properties} = notionPage

    const title = notionBlocksToPlainText(properties['Name'].title)
    const year = properties['Year'].number ?? undefined
    const url  = properties['Link'].url ?? undefined
    const linkDescription = notionBlocksToPlainText(properties['Link description'].rich_text)
    const link = url == null ? undefined : {
      url: url,
      description: linkDescription === '' ? undefined : linkDescription,

    }
    return new Document({id, title, year, link})
  }
}