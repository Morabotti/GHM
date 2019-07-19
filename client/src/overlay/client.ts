import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import config from '../config'
import { Status, ConfigState } from '../common/types'

import {
  Player,
  Map,
  PhaseCountDown,
  Round
} from 'csgo-gsi-types'

import {
  AllPlayers,
  TeamStats,
  Dispatch,
  StateTeamConfig,
  Bomb
} from './types'

import {
  setGameAllPlayerState,
  setGamePlayerState,
  setGameMapState,
  setGamePhaseState,
  setTeamStats,
  setBomb,
  setActiveMatch,
  setActiveToNull,
  setRound
} from './actions'

import {
  setStatus,
  setConfig
} from '../common/actions'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getLatestData = () => window.fetch(
  '/api/game/overlay/init', { method: 'GET' }
)
  .then(checkResponse)
  .catch(() => console.log('No match data initialized.'))

export const subscribeToSocket = (dispatch: Dispatch) => {
  const socket = openSocket(config.socketUrl)

  socket.on('UPDATE_ALLPLAYERS', (
    allPlayers: AllPlayers
  ) => dispatch(setGameAllPlayerState(allPlayers)))

  socket.on('UPDATE_PLAYER', (
    player: Player
  ) => dispatch(setGamePlayerState(player)))

  socket.on('UPDATE_MAP', (
    map: Map
  ) => dispatch(setGameMapState(map)))

  socket.on('UPDATE_PHASE', (
    phase: PhaseCountDown
  ) => dispatch(setGamePhaseState(phase)))

  socket.on('UPDATE_STATUS', (
    status: Status
  ) => dispatch(setStatus(status)))

  socket.on('UPDATE_BOMB', (
    bomb: Bomb
  ) => dispatch(setBomb(bomb)))

  socket.on('UPDATE_ROUND', (
    round: Round
  ) => dispatch(setRound(round)))

  socket.on('UPDATE_STATS', (
    stats: TeamStats
  ) => dispatch(setTeamStats(stats)))

  socket.on('UPDATE_GAME_CONFIG', (
    config: StateTeamConfig
  ) => dispatch(setActiveMatch(config)))

  socket.on('UPDATE_OVERLAY_CONFIG', (
    config: ConfigState
  ) => dispatch(setConfig(config)))

  socket.on('RESET_GAME_CONFIG', () => dispatch(setActiveToNull()))

  setTimeout(getLatestData, 50)
}

export const getActiveMatch = () => window.fetch(
  '/api/matches/overlay',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
