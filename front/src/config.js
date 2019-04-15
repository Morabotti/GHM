// @flow
import { Config } from './types'

const { hostname, protocol } = window.location

const socketPort = 8081
const url = `${protocol}//${hostname}:${socketPort}`

const config: Config = {
  sockets: {
    allPlayers: `${url}/socket-overlay/allplayers`,
    player: `${url}/socket-overlay/player`,
    map: `${url}/socket-overlay/map`,
    phase: `${url}/socket-overlay/phase`
  }
}

export default config
