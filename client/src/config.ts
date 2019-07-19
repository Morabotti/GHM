import { Config } from './types'

const { hostname, protocol } = window.location

const socketPort = 8081

const config: Config = {
  socketUrl: `${protocol}//${hostname}:${socketPort}/socket`,
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
