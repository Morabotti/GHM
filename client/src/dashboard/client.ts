import 'whatwg-fetch'
import { Countries, Maps, UpdatePlayerNoImage, UpdateTeamWithNoImage, NewMatch } from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getMaps = (): Promise<Maps> => fetch(
  '/api/general/maps',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getCountries = (): Promise<Countries> => fetch(
  '/api/general/countries',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const updateCountries = (countries: Countries) => fetch(
  '/api/general/countries',
  {
    method: 'POST',
    body: JSON.stringify({ countries: countries }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getTeams = () => fetch(
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
) => fetch(
  '/api/teams/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const addTeam = (data: FormData) => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch('/api/teams', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updateTeamWithLogo = (
  data: FormData,
  id: string
) => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch(`/api/teams/newlogo/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updateTeam = (
  data: UpdateTeamWithNoImage,
  id: string
) => fetch(
  `/api/teams/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getTeamsDropdown = () => fetch(
  '/api/teams/dropdown/',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getPlayers = () => fetch(
  '/api/players',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addPlayer = (data: FormData) => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch('/api/players', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const removePlayer = (
  id: string
) => fetch(
  '/api/players/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const updatePlayerWithImage = (data: FormData, id: string) => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch(`/api/players/newimg/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updatePlayer = (
  data: UpdatePlayerNoImage,
  id: string
) => fetch(
  `/api/players/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getMatches = () => fetch(
  '/api/matches',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const forceLoadMatches = () => fetch(
  '/api/matches/live',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const setMatch = (data: NewMatch) => fetch(
  '/api/matches',
  {
    method: 'POST',
    body: JSON.stringify({ match: data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const setMatchToLive = (id: string) => fetch(
  `/api/matches/live/${id}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const removeMatch = (id: string) => fetch(
  `/api/matches/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const updateMatch = (data: NewMatch, id: string) => fetch(
  `/api/matches/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
