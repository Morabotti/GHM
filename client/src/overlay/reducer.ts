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
/*
const defaultTeamState: Team = {
  score: null,
  name: '',
  timeouts_remaining: 0,
  matches_won_this_series: 0
}

const defaultPlayerState: PlayerState = {
  health: 100,
  armor: 100,
  helmet: false,
  defusekit: false,
  flashed: 0,
  smoked: 0,
  burning: 0,
  money: 0,
  round_kills: 0,
  round_killhs: 0,
  round_totaldmg: 0,
  equip_value: 0
}

const defaultStatsState: MatchStats = {
  kills: 0,
  assists: 0,
  deaths: 0,
  mvps: 0,
  score: 0
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

const getDefaultState = (): State => ({
  gameStateAllPlayer: {
    '0': {
      name: '',
      observer_slot: 0,
      team: '',
      state: defaultPlayerState,
      match_stats: defaultStatsState,
      weapons: {
        weapon_0: {
          name: '',
          paintkit: '',
          type: '',
          state: 'active'
        }
      },
      position: [],
      forward: [],
      watching: false
    }
  },
  gameStatePlayer: {
    steamid: '',
    name: '',
    observer_slot: 0,
    team: '',
    activity: '',
    state: defaultPlayerState,
    spectarget: '',
    position: [],
    forward: []
  },
  gameStateRound: { },
  gameStateMap: {
    mode: '',
    name: '',
    phase: '',
    round: 0,
    team_ct: defaultTeamState,
    team_t: defaultTeamState,
    num_matches_to_win_series: 0,
    current_spectators: 0,
    souvenirs_total: 0,
    round_wins: []
  },
  gameStatePhase: {
    phase: '',
    phase_ends_in: 0
  },
  gameStateBomb: {
    state: 'dropped',
    position: [],
    countdown: '0'
  },
  events: {
    moneyCount: false
  },
  teamStats: {
    CT: teamStats,
    T: teamStats
  },
  teamConfiguration: {
    teamA: {
      team: 'CT',
      customName: null,
      customLogo: null,
      country: null,
      players: { }
    },
    teamB: {
      team: 'T',
      customName: null,
      customLogo: null,
      country: null,
      players: { }
    },
    players: { }
  }
})
*/

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
