import {
  Player,
  Map,
  PhaseCountDown,
  Round
} from 'csgo-gsi-types'

import {
  AllPlayers,
  TeamStats,
  StateTeamConfig,
  Bomb
} from './types'

export type Action = { type: 'set-game-all-player-state', gameStateAllPlayer: AllPlayers }
| { type: 'set-game-player-state', gameStatePlayer: Player }
| { type: 'set-game-map-state', gameStateMap: Map }
| { type: 'set-game-phase-state', gameStatePhase: PhaseCountDown }
| { type: 'set-game-bomb', gameStateBomb: Bomb }
| { type: 'set-game-round', gameStateRound: Round }
| { type: 'set-team-stats', stats: TeamStats }
| { type: 'set-team-configuration', teamConfiguration: StateTeamConfig }
| { type: 'start-money-count' }
| { type: 'set-team-configuration-reset' }
| { type: 'end-money-count' }

export const setGameAllPlayerState = (gameStateAllPlayer: AllPlayers): Action => ({
  type: 'set-game-all-player-state',
  gameStateAllPlayer
})

export const setGamePlayerState = (gameStatePlayer: Player): Action => ({
  type: 'set-game-player-state',
  gameStatePlayer
})

export const setGameMapState = (gameStateMap: Map): Action => ({
  type: 'set-game-map-state',
  gameStateMap
})

export const setGamePhaseState = (gameStatePhase: PhaseCountDown): Action => ({
  type: 'set-game-phase-state',
  gameStatePhase
})

export const startMoneyCount = (): Action => ({
  type: 'start-money-count'
})

export const endMoneyCount = (): Action => ({
  type: 'end-money-count'
})

export const setTeamStats = (stats: TeamStats): Action => ({
  type: 'set-team-stats',
  stats
})

export const setBomb = (gameStateBomb: Bomb): Action => ({
  type: 'set-game-bomb',
  gameStateBomb
})

export const setRound = (gameStateRound: Round): Action => ({
  type: 'set-game-round',
  gameStateRound
})

export const setActiveMatch = (teamConfiguration: StateTeamConfig): Action => ({
  type: 'set-team-configuration',
  teamConfiguration
})

export const setActiveToNull = (): Action => ({
  type: 'set-team-configuration-reset'
})
