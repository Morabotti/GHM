// @flow
import type {
  Status,
  Countries,
  Teams,
  Players
} from './types'

export type Action = { type: 'set-status', status: Status }
  | { type: 'toggle-navbar', showNavbar: boolean }
  | { type: 'set-countries', countries: Countries }
  | { type: 'set-players', players: Players }
  | { type: 'set-teams', teams: Teams }

export const setStatus = (status: Status) => ({
  type: 'set-status',
  status
})

export const setTeams = (teams: Teams) => ({
  type: 'set-teams',
  teams
})

export const setPlayers = (players: Players) => ({
  type: 'set-players',
  players
})

export const setCountries = (countries: Countries) => ({
  type: 'set-countries',
  countries
})

export const toggleNavBar = (showNavbar: boolean) => ({
  type: 'toggle-navbar',
  showNavbar
})
