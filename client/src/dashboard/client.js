// @flow
import 'whatwg-fetch'

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getMaps = () => window.fetch(
  '/api/general/maps',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getCountries = () => window.fetch(
  '/api/general/countries',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const updateCountries = (countries: any) => window.fetch(
  '/api/general/countries',
  {
    method: 'POST',
    body: JSON.stringify({ countries: countries }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

// ! TEAM METHODS
export const getTeams = () => window.fetch(
  '/api/teams',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const removeTeam = (
  id: string
) => window.fetch(
  '/api/teams/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const addTeam = (data: any) => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return window.fetch('/api/teams', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updateTeamWithLogo = (data: any, id: string) => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return window.fetch(`/api/teams/newlogo/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updateTeam = (
  data: any,
  id: string
) => window.fetch(
  `/api/teams/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getTeamsDropdown = () => window.fetch(
  '/api/teams/dropdown/',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

// ! PLAYER METHODS
export const getPlayers = () => window.fetch(
  '/api/players',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addPlayer = (data: any) => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return window.fetch('/api/players', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const removePlayer = (
  id: string
) => window.fetch(
  '/api/players/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const updatePlayerWithImage = (data: any, id: string) => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return window.fetch(`/api/players/newimg/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updatePlayer = (
  data: any,
  id: string
) => window.fetch(
  `/api/players/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

// ! MATCHES METHODS
export const getMatches = () => window.fetch(
  '/api/matches',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const forceLoadMatches = () => window.fetch(
  '/api/matches/live',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const setMatch = (data: any) => window.fetch(
  '/api/matches',
  {
    method: 'POST',
    body: JSON.stringify({ match: data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const setMatchToLive = (id: string) => window.fetch(
  `/api/matches/live/${id}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const removeMatch = (id: string) => window.fetch(
  `/api/matches/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const updateMatch = (data: any, id: string) => window.fetch(
  `/api/matches/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
