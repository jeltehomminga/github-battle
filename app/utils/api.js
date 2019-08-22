const id = '363d0ae87d2685d4d421'
const sec = '68aaffb32b48f6b88bc467deab4dfc9ebbc37690'
const params = `?client_id=${id}&client_secret=${sec}`

const getErrorMsg = (message, username) => {
  if (message === 'Not Found') {
    return `${username} doesn't exist`
  }
  return message
}

const getProfile = username => {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.mesage, username))
      }
      return profile
    })
}

const getRepos = username => {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMsg(profile.mesage, username))
      }
      return repos
    })
}

const getStarCount = repos => {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  )
}

const calculateScore = (followers, repos) => {
  return followers * 3 + getStarCount(repos)
}

const getUserData = player => {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    })
  )
}

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score)
}

export const battle = players => {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  )
}

export const fetchPopularRepos = language => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  )
  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}
