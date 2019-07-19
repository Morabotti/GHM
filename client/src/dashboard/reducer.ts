import { Action } from './actions'
import {
  Country,
  Players,
  Teams,
  Team,
  Player,
  ListElement,
  Match
} from './types'

export interface Modals {
  confirmModalOpen: boolean,
  viewModalOpen: boolean,
  editModalOpen: boolean,
  confirmLiveModalOpen: boolean
}

export interface GameSettings {
  useCustomRadar: boolean
}

export interface State {
  countries: Country[],
  teamsDropdown: ListElement[],
  teams: Teams,
  players: Players,
  maps: string[],
  matches: Match[],
  selectedItem: number | null,
  selectedId: string | null,
  modals: Modals,
  loadingTeams: boolean,
  loadingPlayers: boolean,
  loadingMatches: boolean
}

const modals: Modals = {
  confirmModalOpen: false,
  viewModalOpen: false,
  editModalOpen: false,
  confirmLiveModalOpen: false
}

const getDefaultState = (): State => ({
  countries: [],
  teams: [],
  teamsDropdown: [],
  players: [],
  selectedItem: null,
  selectedId: null,
  maps: [],
  matches: [],
  loadingTeams: true,
  loadingPlayers: true,
  loadingMatches: true,
  modals: modals
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-maps':
      return {
        ...state,
        maps: action.maps
      }
    case 'set-countries':
      return {
        ...state,
        countries: action.countries.countries
      }
    case 'set-players':
      return {
        ...state,
        players: action.players,
        loadingPlayers: false
      }
    case 'set-teams':
      return {
        ...state,
        teams: action.teams,
        loadingTeams: false
      }
    case 'set-updated-team':
      const newTeam = action.teams
      return {
        ...state,
        teams: state.teams.map((team: Team) => newTeam.find(t => t._id === team._id) || team),
        selectedItem: null
      }
    case 'set-updated-player':
      const newPlayer = action.players
      return {
        ...state,
        players: state.players.map((player: Player) => newPlayer.find(p => p._id === player._id) || player),
        selectedItem: null
      }
    case 'set-teams-dropdown':
      return {
        ...state,
        teamsDropdown: action.teamsDropdown
      }
    case 'set-selected-item':
      return {
        ...state,
        selectedItem: action.selectedItem
      }
    case 'toggle-confirm-modal':
      return {
        ...state,
        modals: {
          ...state.modals,
          confirmModalOpen: action.confirmModalOpen
        }
      }
    case 'toggle-live-modal':
      return {
        ...state,
        modals: {
          ...state.modals,
          confirmLiveModalOpen: action.confirmLiveModalOpen
        }
      }
    case 'toggle-edit-modal':
      return {
        ...state,
        modals: {
          ...state.modals,
          editModalOpen: action.editModalOpen
        }
      }
    case 'toggle-view-modal-player':
      return {
        ...state,
        modals: {
          ...state.modals,
          viewModalOpen: action.viewModalOpen
        }
      }
    case 'set-matches':
      return {
        ...state,
        matches: action.matches,
        loadingMatches: false
      }
    case 'delete-player':
      return {
        ...state,
        players: state.players
          .filter((player: Player, index: number) => index !== state.selectedItem),
        selectedItem: null
      }
    case 'delete-match':
      return {
        ...state,
        matches: state.matches
          .filter((value, index) => index !== state.selectedItem),
        selectedItem: null
      }
    case 'delete-players-from-select':
      return {
        ...state,
        players: state.players
          .filter((player: Player) =>
            player.team !== state.teams[state.selectedItem === null ? 0 : state.selectedItem].teamNameShort)
      }
    case 'delete-team':
      return {
        ...state,
        teams: state.teams
          .filter((team: Team, index: number) => index !== state.selectedItem),
        selectedItem: null
      }
    default:
      return state
  }
}
