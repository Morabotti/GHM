// @flow
import type { Action } from './actions'
import type { AllPlayers, MapState } from './types'

export type State = {
  gameStateAllPlayer: AllPlayers,
  gameStatePlayer: any,
  gameStateMap: MapState
}

const getDefaultState = (): State => ({
  gameStateAllPlayer: {},
  gameStatePlayer: {},
  gameStateMap: {}
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-game-all-player-state':
      return {
        ...state,
        gameStateAllPlayer: action.gameStateAllPlayer
      }
    case 'set-game-player-state':
      return {
        ...state,
        gameStatePlayer: action.gameStatePlayer
      }
    case 'set-game-map-state':
      return {
        ...state,
        gameStateMap: action.gameStateMap
      }
    default:
      return state
  }
}
