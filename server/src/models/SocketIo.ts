import * as SocketIO from 'socket.io'
import * as fs from 'fs'

import { Sockets } from '../types';

import config from '../config'

const io = SocketIO().listen(config.socketIoPort)

export const openSockets: Sockets = JSON.parse(fs.readFileSync(config.settingsPath, 'utf8'))

export const dispatchSocket = (
  url: string,
  method: string,
  data: any
) => {
  io.of(url).emit(method, data)
}