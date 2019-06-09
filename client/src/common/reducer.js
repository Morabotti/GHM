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

export const configState: ConfigState = {
  useRadar: true,
  playerSize: 40,
  bombSize: 40,
  radarNumberSize: 20,
  safeZoneLeft: 35,
  safeZoneRight: 35,
  safeZoneTop: 20,
  safeZoneBottom: 35
}

const getDefaultState = (): State => ({
  config: configState,
  status: statusState
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
