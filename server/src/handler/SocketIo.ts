import * as SocketIO from 'socket.io'
import * as fs from 'fs'

import { Sockets } from '../types';

import config from '../config'

const io = SocketIO().listen(config.socketIoPort)

export const openSockets: Sockets = JSON.parse(fs.readFileSync(config.socketsPath, 'utf8'))

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