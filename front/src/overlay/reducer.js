// @flow
import type { Action } from './actions'
import type {
  AllPlayers,
  MapState,
  PhaseCooldowns,
  CurrentPlayer
} from './types'

export type State = {
  gameStateAllPlayer: AllPlayers,
  gameStatePlayer: CurrentPlayer,
  gameStateMap: MapState,
  gameStatePhase: PhaseCooldowns
}

const getDefaultState = (): State => ({
  gameStateAllPlayer: {},
  gameStatePlayer: {},
  gameStateMap: {
    mode: '',
    name: '',
    phase: '',
    round: 0,
    team_ct: {
      score: 0,
      name: '',
      timeouts_remaining: 0,
      matches_won_this_series: 0
    },
    team_t: {
      score: 0,
      name: '',
      timeouts_remaining: 0,
      matches_won_this_series: 0
    },
    num_matches_to_win_series: 0,
    current_spectators: 0,
    souvenirs_total: 0
  },
  gameStatePhase: {}
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
    default:
      return state
  }
}
