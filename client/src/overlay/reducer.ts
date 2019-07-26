import { Action } from './actions'
import {
  Player,
  Map,
  PhaseCountDown,
  Round,
  TeamType
} from 'csgo-gsi-types'

import {
  AllPlayers,
  EventsReducer,
  TeamStat,
  TeamStats,
  TeamConfig,
  PlayerConfig,
  Bomb
} from './types'

export interface State {
  gameStateAllPlayer: AllPlayers | null,
  gameStatePlayer: Player | null,
  gameStateMap: Map | null,
  gameStatePhase: PhaseCountDown | null,
  gameStateBomb: Bomb | null,
  gameStateRound: Round | null,
  events: EventsReducer,
  teamStats: TeamStats,
  teamConfiguration: {
    teamA: TeamConfig,
    teamB: TeamConfig,
    players: {
      [key: string]: PlayerConfig
    }
  }
}

const teamStats: TeamStat = {
  nades: {
    smokes: 0,
    grenades: 0,
    molotovs: 0,
    flashes: 0
  },
  teamEconomy: 0
}

const teamConfiguration = (team: TeamType) => ({
  team: team,
  customName: null,
  customLogo: null,
  country: null,
  players: { }
})

const getDefaultState = (): State => ({
  gameStateAllPlayer: null,
  gameStatePlayer: null,
  gameStateRound: null,
  gameStateMap: null,
  gameStatePhase: null,
  gameStateBomb: null,
  events: {
    moneyCount: false
  },
  teamStats: {
    CT: teamStats,
    T: teamStats
  },
  teamConfiguration: {
    teamA: teamConfiguration('CT'),
    teamB: teamConfiguration('T'),
    players: { }
  }
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
    case 'set-game-phase-state':
      return {
        ...state,
        gameStatePhase: action.gameStatePhase
      }
    case 'set-game-round':
      return {
        ...state,
        gameStateRound: action.gameStateRound
      }
    case 'set-game-bomb':
      return {
        ...state,
        gameStateBomb: action.gameStateBomb
      }
    case 'start-money-count':
      return {
        ...state,
        events: {
          ...state.events,
          moneyCount: true
        }
      }
    case 'end-money-count':
      return {
        ...state,
        events: {
          ...state.events,
          moneyCount: false
        }
      }
    case 'set-team-stats':
      return {
        ...state,
        teamStats: action.stats
      }
    case 'set-team-configuration':
      return {
        ...state,
        teamConfiguration: action.teamConfiguration
      }
    case 'set-team-configuration-reset':
      return {
        ...state,
        teamConfiguration: getDefaultState().teamConfiguration
      }
    default:
      return state
  }
}
