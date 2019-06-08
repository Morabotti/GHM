import * as SocketIO from 'socket.io'

import { SOCKET } from '../types';

import config from '../config'

const io = SocketIO().listen(config.socketIoPort)

export const socketPath = '/socket'

/*
export const openSockets: Sockets = {
  allPlayers: "/socket-overlay/allplayers",
  player: "/socket-overlay/player",
  map: "/socket-overlay/map",
  phase: "/socket-overlay/phase",
  updates: "/socket-general/status",
  events: "/socket-general/events",
  stats: "/socket-overlay/stats",
  gameconfig: "/socket-overlay/gameconfig",
  bomb: "/socket-overlay/bomb",
  teamconfig: "/socket-overlay/teamconfig"
}
*/

io.on('connection', (socket) => {
  io.of(socketPath).emit('connected')
})

export const dispatchSocket = (
  method: SOCKET,
  data: any
) => {
  io.of(socketPath).emit(method, data)
}