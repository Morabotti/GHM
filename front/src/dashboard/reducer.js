// @flow
import type { Action } from './actions'
import { Status } from './types'

export type State = {
  status: Status
}

const getDefaultState = (): State => ({
  status: [false, false]
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
    default:
      return state
  }
}
