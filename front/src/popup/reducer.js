// @flow
import type { Action } from './actions'

export type State = {}

const getDefaultState = (): State => ({

})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-dummy':
      return {
        ...state,
        dummy: action.dummy
      }
    default:
      return state
  }
}
