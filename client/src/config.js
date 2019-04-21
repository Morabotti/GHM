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
    phase: `${url}/socket-overlay/phase`,
    updates: `${url}/socket-general/status`,
    events: `${url}/socket-general/events`,
    nades: `${url}/socket-overlay/nades`
  },
  teamNadeGrades: {
    bad: {
      range: 1,
      text: 'bad',
      output: 'Bad'
    },
    poor: {
      range: 5,
      text: 'poor',
      output: 'Poor'
    },
    fair: {
      range: 9,
      text: 'fair',
      output: 'Fair'
    },
    good: {
      range: 14,
      text: 'good',
      output: 'Good'
    },
    excellent: {
      range: 17,
      text: 'excellent',
      output: 'Excellent'
    }
  }
}

export default config
