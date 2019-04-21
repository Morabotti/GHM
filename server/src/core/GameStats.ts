import {
  TeamStats,
  GameState,
  TeamType,
  NadeCalculation
} from '../types'

import { dispatchSocket, openSockets } from '../models/SocketIo'
import { deepEqual } from '../utils/helpers'

class GameStats {
  teamTerrorist: TeamStats
  teamCounterTerrorist: TeamStats

  constructor() {
    this.teamTerrorist = this.initDefault()
    this.teamCounterTerrorist = this.initDefault()
  }

  initDefault = () => ({
    smokes: 0,
    grenades: 0,
    molotovs: 0,
    flashes: 0
  })

  checkIfUpdated = (state: GameState) => {
    const nades: NadeCalculation = this.calculateGrenades(state)
    const oldNades: NadeCalculation = {
      T: this.getTeamStats('T'),
      CT: this.getTeamStats('CT')
    }

    const test = deepEqual(nades, oldNades)
    if (!test) {
      this.teamCounterTerrorist = nades.CT
      this.teamTerrorist = nades.T

      dispatchSocket(
        openSockets.nades,
        'state',
        nades
      )
    }
  }

  calculateGrenades = (state: GameState): NadeCalculation => {
    let nades: NadeCalculation = {
      T: this.initDefault(),
      CT: this.initDefault()
    }

    Object.keys(state.allplayers).map(player => {
      const players = state.allplayers
      Object.keys(players[player].weapons)
        .filter(weapon => players[player].weapons[weapon].type === 'Grenade')
        .map(grenade => {
          const user = players[player]
          const nade = user.weapons[grenade]
          switch(nade.name) {
            case 'weapon_flashbang':
              nades = {
                ...nades,
                [user.team]: {
                  ...nades[user.team],
                  flashes: nades[user.team].flashes+nade.ammo_reserve
                }
              }
              break
            case 'weapon_hegrenade':
              nades = {
                ...nades,
                [user.team]: {
                  ...nades[user.team],
                  grenades: nades[user.team].grenades+nade.ammo_reserve
                }
              }
              break
            case 'weapon_incgrenade':
              nades = {
                ...nades,
                [user.team]: {
                  ...nades[user.team],
                  molotovs: nades[user.team].molotovs+nade.ammo_reserve
                }
              }
              break
            case 'weapon_molotov':
              nades = {
                ...nades,
                [user.team]: {
                  ...nades[user.team],
                  molotovs: nades[user.team].molotovs+nade.ammo_reserve
                }
              }
              break
            case 'weapon_smokegrenade':
              nades = {
                ...nades,
                [user.team]: {
                  ...nades[user.team],
                  smokes: nades[user.team].smokes+nade.ammo_reserve
                }
              }
              break
          }
        }
      )
    })
    return nades
  }

  getTeamStats = (team: TeamType) => {
    if (team === 'CT') {
      return this.teamCounterTerrorist
    } else {
      return this.teamTerrorist
    }
  }

  sendLatestDispatch = () => {
    const nades: NadeCalculation = {
      T: this.getTeamStats('T'),
      CT: this.getTeamStats('CT')
    }

    dispatchSocket(
      openSockets.nades,
      'state',
      nades
    )
  }
}

const gameStats = new GameStats()

export default gameStats
