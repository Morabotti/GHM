// @flow
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import type { Dispatch, EventType } from './types'

import config from '../config'

import {
  setGameAllPlayerState,
  setGamePlayerState,
  setGameMapState,
  setGamePhaseState,
  setNades,
  setBomb,
  setActiveMatch,
  setActiveToNull,
  setRound
} from './actions'

import {
  setStatus,
  setConfig
} from '../common/actions'

export const subscribeToSocket = (dispatch: Dispatch) => {
  const socket = openSocket(config.socketUrl)
  socket.on('UPDATE_ALLPLAYERS', data => dispatch(setGameAllPlayerState(data)))
  socket.on('UPDATE_PLAYER', data => dispatch(setGamePlayerState(data)))
  socket.on('UPDATE_MAP', data => dispatch(setGameMapState(data)))
  socket.on('UPDATE_PHASE', data => dispatch(setGamePhaseState(data)))
  socket.on('UPDATE_STATUS', data => dispatch(setStatus(data)))
  socket.on('UPDATE_EVENTS', data => analyzeEvent(data, dispatch))
  socket.on('UPDATE_STATS', data => dispatch(setNades(data)))
  socket.on('UPDATE_BOMB', data => dispatch(setBomb(data)))
  socket.on('UPDATE_GAME_CONFIG', data => dispatch(setActiveMatch(data)))
  socket.on('RESET_GAME_CONFIG', () => dispatch(setActiveToNull()))
  socket.on('UPDATE_OVERLAY_CONFIG', data => dispatch(setConfig(data)))
  socket.on('UPDATE_ROUND', data => dispatch(setRound(data)))

  setTimeout(getLatestData, 50)
}

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getLatestData = () => window.fetch(
  '/api/game/overlay/init', { method: 'GET' }
)
  .then(checkResponse)
  .catch(e => console.log('No match data initialized.'))

export const getActiveMatch = () => window.fetch(
  '/api/matches/overlay',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

const analyzeEvent = (event: EventType, dispatch: Dispatch) => {
  switch (event.event) {
    case 'FREEZETIME_END':
      break
    case 'FREEZETIME_START':
      break
  }
}
