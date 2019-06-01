// @flow
import type { Action } from './actions'
import type { ConfigState } from './types'

export type State = {
  config: ConfigState
}

const getDefaultState = (): State => ({
  config: {
    useRadar: false
  }
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
    default:
      return state
  }
}
