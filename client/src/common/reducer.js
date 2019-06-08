// @flow
import type { Action } from './actions'
import type { ConfigState, Status } from './types'

export type State = {
  config: ConfigState,
  status: Status
}

const statusState: Status = {
  clientOnline: false,
  clientSpectating: false,
  gameOnline: false,
  gameLive: false
}

const getDefaultState = (): State => ({
  config: {
    useRadar: false
  },
  status: statusState,
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-config':
      return {
        ...state,
        config: action.config
      }
    case 'set-status':
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
