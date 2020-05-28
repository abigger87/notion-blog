const fetch = require('node-fetch')

export default async (_, res) => {
  // * Parse Wakatime url - example: https://wakatime.com/@username
  let start_username = _.headers.link.substring(
    _.headers.link.lastIndexOf('/') + 2
  )
  let username = start_username.substring(0, start_username.indexOf('&'))
  let range = _.headers.range ? _.headers.range : 'last_year'

  // * Consume API Key
  const API_KEY = process.env.WAKATIME_API_KEY

  // * Fetch data from v1 REST endpoint
  const url = `https://wakatime.com/api/v1/users/${
    username ? username : 'abigger'
  }/stats/${range}?api_key=${API_KEY}`

  const response = await fetch(url)
  const stats = await response.json()

  // * Return stats with 200
  return res.status(200).json({
    wakatime_stats: stats,
  })
}
