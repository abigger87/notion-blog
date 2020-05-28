const fetch = require('node-fetch')

export default async (_, res) => {
  let username = _.headers.link.substring(_.headers.link.lastIndexOf('/') + 1)
  const userResponse = await fetch(`https://api.github.com/users/${username}`)
  const userReposResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  )

  const user = await userResponse.json()
  const repositories = await userReposResponse.json()

  const mine = repositories?.filter(repo => !repo.fork)
  const stars = mine?.reduce((accumulator, repository) => {
    return accumulator + repository['stargazers_count']
  }, 0)

  return res.status(200).json({
    followers: user?.followers,
    stars,
  })
}
