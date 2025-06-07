import {NOTION_API_TOKEN} from '$env/static/private'
import path from 'path'

export default {
  notion: {
    token:       NOTION_API_TOKEN,
    databaseID: '1dcd99b727fb80aa9e81c5b59feb0b5b',
  },
  images: {
    cacheDirectory: path.join(process.cwd(), 'src', 'static', 'image-cache')
  },
}