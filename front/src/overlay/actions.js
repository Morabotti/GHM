// @flow
import type { AllPlayers } from './types'

export type Action = { type: 'set-game-state', gameState: AllPlayers}

export const setGameState = (gameState: AllPlayers) => ({
  type: 'set-game-state',
  gameState
})
