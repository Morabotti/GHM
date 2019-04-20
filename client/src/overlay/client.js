// @flow
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import type { Dispatch } from './types'

import config from '../config'

import {
  setGameAllPlayerState,
  setGamePlayerState,
  setGameMapState,
  setGamePhaseState,
  setStatus
} from './actions'

export const subscribeToSocket = (dispatch: Dispatch) => {
  subscribeToSocketAllPlayers(dispatch)
  subscribeToSocketPlayer(dispatch)
  subscribeToSocketMap(dispatch)
  subscribeToSocketPhase(dispatch)
  subscribeToSocketUpdates(dispatch)
  setTimeout(getLatestData, 10)
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
  .catch(e => console.log(e))

export const subscribeToSocketAllPlayers = (dispatch: Dispatch) => {
  const socket = openSocket(config.sockets.allPlayers)
  socket.on('state', data => {
    dispatch(setGameAllPlayerState(data))
  })
}

export const subscribeToSocketPlayer = (dispatch: Dispatch) => {
  const socket = openSocket(config.sockets.player)
  socket.on('state', data => {
    dispatch(setGamePlayerState(data))
  })
}

export const subscribeToSocketMap = (dispatch: Dispatch) => {
  const socket = openSocket(config.sockets.map)
  socket.on('state', data => {
    dispatch(setGameMapState(data))
  })
}

export const subscribeToSocketPhase = (dispatch: Dispatch) => {
  const socket = openSocket(config.sockets.phase)
  socket.on('state', data => {
    dispatch(setGamePhaseState(data))
  })
}

export const subscribeToSocketUpdates = (dispatch: Dispatch) => {
  const socket = openSocket(config.sockets.updates)
  socket.on('state', data => {
    dispatch(setStatus(data))
  })
}

export const getStatus = () => window.fetch(
  '/api/game/online',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
