import {Client} from '@notionhq/client'
import config from '~/config'

const notion = new Client({
  auth: config.notion.token,
})

export default notion