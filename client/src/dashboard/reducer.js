// @flow
import type { Action } from './actions'
import type { Status } from './types'

export type State = {
  status: Status,
  showNavbar: boolean
}

const StatusState: Status = {
  clientOnline: false,
  clientSpectating: false,
  gameOnline: false,
  gameLive: false,
}

const getDefaultState = (): State => ({
  status: StatusState,
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
    default:
      return state
  }
}
