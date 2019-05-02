// @flow
import type { Action } from './actions'
import type {
  Status,
  Country,
  Players,
  Teams,
  Team,
  ListElement,
  Match
} from './types'

export type Modals = {
  confirmModalOpen: boolean,
  viewModalOpen: boolean,
  editModalOpen: boolean,
  teamSelectionModalOpen: boolean,
  confirmLiveModalOpen: boolean
}

export type State = {
  status: Status,
  showNavbar: boolean,
  countries: Array<Country>,
  teamsDropdown: Array<ListElement>,
  teams: Teams,
  players: Players,
  maps: Array<string>,
  matches: Array<Match>,
  selectedItem: number | null,
  selectedId: string | null,
  modals: Modals
}

const statusState: Status = {
  clientOnline: false,
  clientSpectating: false,
  gameOnline: false,
  gameLive: false
}

const modals: Modals = {
  confirmModalOpen: false,
  viewModalOpen: false,
  editModalOpen: false,
  teamSelectionModalOpen: false,
  confirmLiveModalOpen: false,
}

const getDefaultState = (): State => ({
  status: statusState,
  countries: [],
  teams: [],
  teamsDropdown: [],
  players: [],
  selectedItem: null,
  selectedId: null,
  maps: [],
  matches: [],
  modals: modals,
  showNavbar: true
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-status':
      return {
        ...state,
        status: action.status
      }
    case 'set-maps':
      return {
        ...state,
        maps: action.maps
      }
    case 'set-selected-id':
      return {
        ...state,
        selectedId: action.selectedId
      }
    case 'toggle-navbar':
      return {
        ...state,
        showNavbar: action.showNavbar
      }
    case 'set-countries':
      return {
        ...state,
        countries: action.countries.countries
      }
    case 'set-players':
      return {
        ...state,
        players: action.players
      }
    case 'set-teams':
      return {
        ...state,
        teams: action.teams
      }
    case 'set-updated-team':
      const newTeam = action.teams
      return {
        ...state,
        teams: state.teams.map(team => newTeam.find(t => t._id === team._id) || team),
        selectedItem: null
      }
    case 'set-updated-player':
      const newPlayer = action.players
      return {
        ...state,
        players: state.players.map(player => newPlayer.find(p => p._id === player._id) || player),
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
    case 'toggle-team-selection-modal':
      return {
        ...state,
        modals: {
          ...state.modals,
          teamSelectionModalOpen: action.teamSelectionModalOpen
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
        matches: action.matches
      }
    case 'delete-player':
      return {
        ...state,
        players: state.players
          .filter((value, index) => index !== state.selectedItem),
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
          .filter((player) => 
            player.team !== state.teams[state.selectedItem === null ? 0 : state.selectedItem].teamNameShort)
      }
    case 'delete-team':
      return {
        ...state,
        teams: state.teams
          .filter((value, index) => index !== state.selectedItem),
        selectedItem: null
      }
    default:
      return state
  }
}
