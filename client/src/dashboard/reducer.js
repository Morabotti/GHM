// @flow
import type { Action } from './actions'
import type {
  Status,
  Country,
  Players,
  Teams,
  ListElement
} from './types'

export type State = {
  status: Status,
  showNavbar: boolean,
  countries: Array<Country>,
  teamsDropdown: Array<ListElement>,
  teams: Teams,
  players: Players,
  selectedItem: number | null,
  modals: {
    confirmModalOpen: boolean
  }
}

const StatusState: Status = {
  clientOnline: false,
  clientSpectating: false,
  gameOnline: false,
  gameLive: false
}

const getDefaultState = (): State => ({
  status: StatusState,
  countries: [],
  teams: [],
  teamsDropdown: [],
  players: [],
  selectedItem: null,
  modals: {
    confirmModalOpen: false
  },
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
    case 'delete-player':
      return {
        ...state,
        players: state.players
          .filter((value, index) => index !== state.selectedItem),
        selectedItem: null
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
