import * as SocketIO from 'socket.io'
import * as fs from 'fs'

import { Sockets } from '../types';

import config from '../config'

const io = SocketIO().listen(config.socketIoPort)

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

io.on('connection', (socket) => {
  Object.keys(openSockets).forEach(key => {
    io.of(openSockets[key]).emit('connected')
  })
})

export const dispatchSocket = (
  url: string,
  method: string,
  data: any
) => {
  io.of(url).emit(method, data)
}