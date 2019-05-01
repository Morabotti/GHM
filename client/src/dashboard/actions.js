// @flow
import type {
  Status,
  Countries,
  Teams,
  Players,
  Team,
  Player,
  ListElement
} from './types'

export type Action = { type: 'set-status', status: Status }
  | { type: 'toggle-navbar', showNavbar: boolean }
  | { type: 'set-maps', maps: Array<string> }
  | { type: 'set-countries', countries: Countries }
  | { type: 'set-players', players: Players }
  | { type: 'set-selected-id', selectedId: string | null }
  | { type: 'set-teams', teams: Teams }
  | { type: 'set-updated-team', teams: Array<Team> }
  | { type: 'set-updated-player', players: Array<Player> }
  | { type: 'set-teams-dropdown', teamsDropdown: Array<ListElement> }
  | { type: 'delete-player' }
  | { type: 'delete-team' }
  | { type: 'delete-players-from-select' }
  | { type: 'toggle-confirm-modal', confirmModalOpen: boolean }
  | { type: 'toggle-team-selection-modal', teamSelectionModalOpen: boolean }
  | { type: 'toggle-edit-modal', editModalOpen: boolean }
  | { type: 'toggle-view-modal-player', viewModalOpen: boolean }
  | { type: 'set-selected-item', selectedItem: number }

export const setStatus = (status: Status) => ({
  type: 'set-status',
  status
})

export const setSelectedId = (selectedId: string | null) => ({
  type: 'set-selected-id',
  selectedId
})

export const setTeams = (teams: Teams) => ({
  type: 'set-teams',
  teams
})

export const updatedTeam = (teams: Array<Team>) => ({
  type: 'set-updated-team',
  teams
})

export const setMaps = (maps: Array<string>) => ({
  type: 'set-maps',
  maps
})

export const updatedPlayer = (players: Array<Player>) => ({
  type: 'set-updated-player',
  players
})

export const setTeamsDropdown = (teamsDropdown: Array<ListElement>) => ({
  type: 'set-teams-dropdown',
  teamsDropdown
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

export const deletePlayer = () => ({
  type: 'delete-player'
})

export const deleteTeam = () => ({
  type: 'delete-team'
})

export const deletePlayersFromTeam = () => ({
  type: 'delete-players-from-select'
})

export const toggleConfirmModal = (confirmModalOpen: boolean) => ({
  type: 'toggle-confirm-modal',
  confirmModalOpen
})

export const toggleEditModal = (editModalOpen: boolean) => ({
  type: 'toggle-edit-modal',
  editModalOpen
})

export const toggleViewModal = (viewModalOpen: boolean) => ({
  type: 'toggle-view-modal-player',
  viewModalOpen
})

export const toggleTeamSelectionModal = (teamSelectionModalOpen: boolean) => ({
  type: 'toggle-team-selection-modal',
  teamSelectionModalOpen
})

export const setSelectedItem = (selectedItem: number) => ({
  type: 'set-selected-item',
  selectedItem
})