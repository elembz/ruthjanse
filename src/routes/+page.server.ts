import {Document, notion} from '~/lib/server'
import type {PageServerLoad} from './$types'
import config from '~/config'

export const load: PageServerLoad = async () => {
  const documents = await Document.list()
  const database  = await notion.databases.retrieve({
    database_id: config.notion.databaseID,
  })
  return {
    documents:   documents.map(it => it.serialize()),
    description: (database as any).description,
  }
}