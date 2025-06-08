import {Image} from '~/lib/server/image'
import type {RequestHandler} from './$types'
import {error} from '@sveltejs/kit'

export const GET: RequestHandler = async ({params}) => {
  const image = Image.cache.get(params.id)
  if (image == null) {
    return error(404)
  }

  return new Response(await image.buffer, {
    status:  200,
    headers: {'Content-Type': 'image/webp'},
  })
}