// @flow
import type {
  AllPlayers,
  MapState,
  PhaseCooldowns,
  CurrentPlayer,
  TeamStats,
  StateTeamConfig,
  BombState
} from './types'

import type { Status } from '../dashboard/types'

export type Action = { type: 'set-game-all-player-state', gameStateAllPlayer: AllPlayers}
  | { type: 'set-game-player-state', gameStatePlayer: CurrentPlayer}
  | { type: 'set-game-map-state', gameStateMap: MapState}
  | { type: 'set-game-phase-state', gameStatePhase: PhaseCooldowns}
  | { type: 'set-game-bomb', gameStateBomb: BombState}
  | { type: 'set-team-stats', stats: TeamStats }
  | { type: 'set-team-configuration', teamConfiguration: StateTeamConfig }
  | { type: 'start-money-count' }
  | { type: 'set-team-configuration-reset' }
  | { type: 'end-money-count' }

export const setGameAllPlayerState = (gameStateAllPlayer: AllPlayers) => ({
  type: 'set-game-all-player-state',
  gameStateAllPlayer
})

export const setGamePlayerState = (gameStatePlayer: CurrentPlayer) => ({
  type: 'set-game-player-state',
  gameStatePlayer
})

export const setGameMapState = (gameStateMap: MapState) => ({
  type: 'set-game-map-state',
  gameStateMap
})

export const setGamePhaseState = (gameStatePhase: PhaseCooldowns) => ({
  type: 'set-game-phase-state',
  gameStatePhase
})

export const startMoneyCount = () => ({
  type: 'start-money-count'
})

export const endMoneyCount = () => ({
  type: 'end-money-count'
})

export const setNades = (stats: TeamStats) => ({
  type: 'set-team-stats',
  stats
})

export const setBomb = (gameStateBomb: BombState) => ({
  type: 'set-game-bomb',
  gameStateBomb
})

export const setActiveMatch = (teamConfiguration: StateTeamConfig) => ({
  type: 'set-team-configuration',
  teamConfiguration
})

export const setActiveToNull = () => ({
  type: 'set-team-configuration-reset'
})
