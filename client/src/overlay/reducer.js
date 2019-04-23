// @flow
import type { Action } from './actions'
import type {
  AllPlayers,
  MapState,
  PhaseCooldowns,
  CurrentPlayer,
  PlayerState,
  Team,
  MatchStats,
  EventsReducer,
  TeamStat,
  TeamStats
} from './types'

import type { Status } from '../dashboard/types'

export type State = {
  gameStateAllPlayer: AllPlayers,
  gameStatePlayer: CurrentPlayer,
  gameStateMap: MapState,
  gameStatePhase: PhaseCooldowns,
  status: Status,
  events: EventsReducer,
  teamStats: TeamStats
}

const defaultTeamState: Team = {
  score: 0,
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

const statusState: Status = {
  clientOnline: false,
  clientSpectating: false,
  gameOnline: false,
  gameLive: false
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
  gameStateMap: {
    mode: '',
    name: '',
    phase: '',
    round: 0,
    team_ct: defaultTeamState,
    team_t: defaultTeamState,
    num_matches_to_win_series: 0,
    current_spectators: 0,
    souvenirs_total: 0
  },
  gameStatePhase: {
    phase: '',
    phase_ends_in: 0
  },
  status: statusState,
  events: {
    moneyCount: false
  },
  teamStats: {
    CT: teamStats,
    T: teamStats
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
    case 'set-status-overlay':
      return {
        ...state,
        status: action.status
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
    default:
      return state
  }
}
