import {Document} from '$lib/server'
import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const document = await Document.get(params.id)
  if (document == null) {
    error(404)
  }
  return {document: document?.serialize()}
}