// @ts-nocheck
import { google } from 'googleapis'

import googleAuth from '../../lib/google/auth'

export default async (_, res) => {
  let id = _.headers.link.substring(_.headers.link.lastIndexOf('/') + 1)
  const auth = await googleAuth.getClient()
  const youtube = google.youtube({
    auth,
    version: 'v3',
  })

  const response = await youtube.channels.list({
    id: id,
    part: 'statistics',
  })

  const channel = response.data.items[0]
  const { subscriberCount, viewCount } = channel.statistics

  return res.status(200).json({
    subscriberCount,
    viewCount,
  })
}
