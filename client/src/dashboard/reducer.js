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
  players: Players
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
    default:
      return state
  }
}
