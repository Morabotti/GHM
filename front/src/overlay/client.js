// @flow
import 'whatwg-fetch'
import openSocket from 'socket.io-client'

const socketEndPoint = 'http://localhost:8081/socket-overlay'

import { setGameState } from './actions'

export const subscribeToSocket = (dispatch) => {
  const socket = openSocket(socketEndPoint)
  socket.on('state', data => {
    dispatch(setGameState(data))
  })
}
