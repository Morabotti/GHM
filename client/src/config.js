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
    stats: `${url}/socket-overlay/stats`
  },
  teamNadeGrades: {
    bad: {
      range: 1,
      text: 'bad',
      output: 'Bad'
    },
    poor: {
      range: 6,
      text: 'poor',
      output: 'Poor'
    },
    fair: {
      range: 10,
      text: 'fair',
      output: 'Fair'
    },
    good: {
      range: 17,
      text: 'good',
      output: 'Good'
    },
    excellent: {
      range: 17,
      text: 'excellent',
      output: 'Excellent'
    }
  },
  teamEconomyGrades: {
    bad: {
      range: 2300,
      text: 'bad',
      output: 'Bad'
    },
    poor: {
      range: 10000,
      text: 'poor',
      output: 'Poor'
    },
    fair: {
      range: 19000,
      text: 'fair',
      output: 'Fair'
    },
    good: {
      range: 26000,
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
