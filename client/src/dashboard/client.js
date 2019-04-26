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

// * TEAM METHODS

export const getTeams = () => window.fetch(
  '/api/teams',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

// * PLAYER METHODS

export const getPlayers = () => window.fetch(
  '/api/players',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
