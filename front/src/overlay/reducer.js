// @flow
import type { Action } from './actions'
import type { AllPlayers } from './types'

export type State = {
  gameState: AllPlayers
}

const getDefaultState = (): State => ({
  gameState: {}
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-game-state':
      return {
        ...state,
        gameState: action.gameState
      }
    default:
      return state
  }
}
