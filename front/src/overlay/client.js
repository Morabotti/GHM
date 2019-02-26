// @flow
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import type { Dispatch } from './types'

import {
  setGameAllPlayerState,
  setGamePlayerState,
  setGameMapState
} from './actions'

const socketIOPORT = 8081
const { hostname, protocol } = window.location
const url = `${protocol}//${hostname}:${socketIOPORT}`
const socketEndPointAllPlayer = `${url}/socket-overlay/allplayers`
const socketEndPointPlayer = `${url}/socket-overlay/player`
const socketEndPointMap = `${url}/socket-overlay/map`

export const subscribeToSocket = (dispatch: Dispatch) => {
  subscribeToSocketAllPlayers(dispatch)
  subscribeToSocketPlayer(dispatch)
  subscribeToSocketMap(dispatch)
  setTimeout(getLatestData, 10)
}

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getLatestData = () => window.fetch(
  '/api/csgsi/overlay/init', { method: 'GET' }
).then(checkResponse)

export const subscribeToSocketAllPlayers = (dispatch: Dispatch) => {
  const socket = openSocket(socketEndPointAllPlayer)
  socket.on('state', data => {
    dispatch(setGameAllPlayerState(data))
  })
}

export const subscribeToSocketPlayer = (dispatch: Dispatch) => {
  const socket = openSocket(socketEndPointPlayer)
  socket.on('state', data => {
    dispatch(setGamePlayerState(data))
  })
}

export const subscribeToSocketMap = (dispatch: Dispatch) => {
  const socket = openSocket(socketEndPointMap)
  socket.on('state', data => {
    dispatch(setGameMapState(data))
  })
}
