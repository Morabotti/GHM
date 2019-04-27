// @flow
import 'whatwg-fetch'

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getStatus = () => window.fetch(
  '/api/game/online',
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

export const updateCountries = () => window.fetch(
  '/api/general/countries',
  {
    method: 'POST',
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
    headers: { 'content-type': 'multipart/form-data'}
  }

  delete options.headers['content-type'];

  return window.fetch('/api/teams', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const getTeamsDropdown = () => window.fetch(
  '/api/teams/dropdown',
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
    headers: { 'content-type': 'multipart/form-data'}
  }

  delete options.headers['content-type'];

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

