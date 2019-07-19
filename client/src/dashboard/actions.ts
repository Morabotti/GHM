import {
  Countries,
  Teams,
  Players,
  Team,
  Player,
  ListElement,
  Match
} from './types'

export type Action = { type: 'set-maps', maps: string[] }
| { type: 'set-countries', countries: Countries }
| { type: 'set-players', players: Players }
| { type: 'set-teams', teams: Teams }
| { type: 'set-updated-team', teams: Team[] }
| { type: 'set-updated-player', players: Player[] }
| { type: 'set-matches', matches: Match[] }
| { type: 'set-teams-dropdown', teamsDropdown: ListElement[] }
| { type: 'delete-player' }
| { type: 'delete-team' }
| { type: 'delete-match' }
| { type: 'delete-players-from-select' }
| { type: 'toggle-confirm-modal', confirmModalOpen: boolean }
| { type: 'toggle-live-modal', confirmLiveModalOpen: boolean }
| { type: 'toggle-edit-modal', editModalOpen: boolean }
| { type: 'toggle-view-modal-player', viewModalOpen: boolean }
| { type: 'set-selected-item', selectedItem: number }

export const setTeams = (teams: Teams): Action => ({
  type: 'set-teams',
  teams
})

export const updatedTeam = (teams: Team[]): Action => ({
  type: 'set-updated-team',
  teams
})

export const setMaps = (maps: string[]): Action => ({
  type: 'set-maps',
  maps
})

export const updatedPlayer = (
  players: Player[]
): Action => ({
  type: 'set-updated-player',
  players
})

export const setTeamsDropdown = (
  teamsDropdown: ListElement[]
): Action => ({
  type: 'set-teams-dropdown',
  teamsDropdown
})

export const setPlayers = (players: Players): Action => ({
  type: 'set-players',
  players
})

export const setCountries = (countries: Countries): Action => ({
  type: 'set-countries',
  countries
})

export const deletePlayer = (): Action => ({
  type: 'delete-player'
})

export const deleteMatch = (): Action => ({
  type: 'delete-match'
})

export const deleteTeam = (): Action => ({
  type: 'delete-team'
})

export const deletePlayersFromTeam = (): Action => ({
  type: 'delete-players-from-select'
})

export const toggleConfirmModal = (confirmModalOpen: boolean): Action => ({
  type: 'toggle-confirm-modal',
  confirmModalOpen
})

export const toggleEditModal = (editModalOpen: boolean): Action => ({
  type: 'toggle-edit-modal',
  editModalOpen
})

export const toggleViewModal = (viewModalOpen: boolean): Action => ({
  type: 'toggle-view-modal-player',
  viewModalOpen
})

export const toggleLiveConfirmModal = (
  confirmLiveModalOpen: boolean
): Action => ({
  type: 'toggle-live-modal',
  confirmLiveModalOpen
})

export const setSelectedItem = (
  selectedItem: number
): Action => ({
  type: 'set-selected-item',
  selectedItem
})

export const setMatches = (
  matches: Match[]
): Action => ({
  type: 'set-matches',
  matches
})
