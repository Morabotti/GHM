import { dispatchSocket } from '../handler/SocketIo'
import { deepEqual } from '../utils/helpers'
import { SOCKET } from '../types'

import {
  TeamStats,
  GameState,
  TeamType,
  StatsCalculation
} from '../types'

class GameStats {
  teamTerrorist: TeamStats
  teamCounterTerrorist: TeamStats

  constructor() {
    this.teamTerrorist = this.initDefault()
    this.teamCounterTerrorist = this.initDefault()
  }

  initDefault = () => ({
    nades: {
      smokes: 0,
      grenades: 0,
      molotovs: 0,
      flashes: 0
    },
    teamEconomy: 0
  })

  checkIfUpdated = (state: GameState) => {
    if(state.allplayers === undefined) return

    const stats: StatsCalculation = this.calculateStats(state)
    const oldStats: StatsCalculation = {
      T: this.getTeamStats('T'),
      CT: this.getTeamStats('CT')
    }
    
    const test = deepEqual(stats, oldStats)
    if (!test) {
      this.teamCounterTerrorist = stats.CT
      this.teamTerrorist = stats.T

      dispatchSocket(SOCKET.STATS, stats)
    }
  }

  calculateStats = (state: GameState): StatsCalculation => {
    let stats: StatsCalculation = {
      T: this.initDefault(),
      CT: this.initDefault()
    }

    Object.keys(state.allplayers).map(player => {
      const players = state.allplayers
      const user = players[player]
      stats = {
        ...stats,
        [user.team]: {
          ...stats[user.team],
          teamEconomy: stats[user.team].teamEconomy + user.state.equip_value
        }
      }

      Object.keys(players[player].weapons)
        .filter(weapon => players[player].weapons[weapon].type === 'Grenade')
        .map(grenade => {
          const nade = user.weapons[grenade]
          switch(nade.name) {
            case 'weapon_flashbang':
              stats = {
                ...stats,
                [user.team]: {
                  ...stats[user.team],
                  nades: {
                    ...stats[user.team].nades,
                    flashes: stats[user.team].nades.flashes + nade.ammo_reserve
                  }
                }
              }
              break
            case 'weapon_hegrenade':
              stats = {
                ...stats,
                [user.team]: {
                  ...stats[user.team],
                  nades: {
                    ...stats[user.team].nades,
                    grenades: stats[user.team].nades.grenades + nade.ammo_reserve
                  }
                }
              }
              break
            case 'weapon_incgrenade':
              stats = {
                ...stats,
                [user.team]: {
                  ...stats[user.team],
                  nades: {
                    ...stats[user.team].nades,
                    molotovs: stats[user.team].nades.molotovs + nade.ammo_reserve
                  }
                }
              }
              break
            case 'weapon_molotov':
              stats = {
                ...stats,
                [user.team]: {
                  ...stats[user.team],
                  nades: {
                    ...stats[user.team].nades,
                    molotovs: stats[user.team].nades.molotovs + nade.ammo_reserve
                  }
                }
              }
              break
            case 'weapon_smokegrenade':
              stats = {
                ...stats,
                [user.team]: {
                  ...stats[user.team],
                  nades: {
                    ...stats[user.team].nades,
                    smokes: stats[user.team].nades.smokes + nade.ammo_reserve
                  }
                }
              }
              break
          }
        }
      )
    })
    return stats
  }

  getTeamStats = (team: TeamType) => {
    if (team === 'CT') {
      return this.teamCounterTerrorist
    } else {
      return this.teamTerrorist
    }
  }

  sendLatestDispatch = () => {
    const stats: StatsCalculation = {
      T: this.getTeamStats('T'),
      CT: this.getTeamStats('CT')
    }

    dispatchSocket(SOCKET.STATS, stats)
  }
}

const gameStats = new GameStats()

export default gameStats
