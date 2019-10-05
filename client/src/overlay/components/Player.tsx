import React, { PureComponent } from 'react'

import {
  TeamType,
  Weapons,
  PlayerState,
  PlayerStats
} from 'csgo-gsi-types'

import HEAD_ARMOR from '../../assets/util/armor_head.svg'
import ARMOR from '../../assets/util/armor.svg'

interface Props {
  first?: boolean,
  last?: boolean,
  name: string | null,
  team: TeamType,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  weapons: Weapons | any, // Figure out typeof
  state: PlayerState,
  stats: PlayerStats,
  watching: boolean,
  observerSlot: number,
  showStats: boolean,
  flashed: number
}

interface ComponentState {
  money: number
}

class Player extends PureComponent<Props, ComponentState> {
  state = {
    money: 0
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.showStats && !prevProps.showStats) {
      this.setState({ money: this.props.state.money })
    }
  }

  render () {
    const {
      first,
      last,
      name,
      observerSlot,
      state,
      weapons,
      team,
      watching,
      stats,
      showStats,
      flashed
    } = this.props

    const hasMainWeapon = Object.keys(weapons)
      .find((weapon): boolean => weapons[weapon].type === 'Rifle'
        || weapons[weapon].type === 'SniperRifle'
        || weapons[weapon].type === 'Machine Gun'
        || weapons[weapon].type === 'Shotgun'
        || weapons[weapon].type === 'Submachine Gun')

    const hasSecondaryWeapon = Object.keys(weapons)
      .find(weapon => weapons[weapon].type === 'Pistol')

    const mainWeaponBig = (hasMainWeapon !== undefined
      && (weapons[hasMainWeapon].name === 'weapon_m4a1_silencer'
      || weapons[hasMainWeapon].name === 'weapon_nova'
      || weapons[hasMainWeapon].name === 'weapon_xm1014')
    )

    const mainWeaponBigger = (hasMainWeapon !== undefined && weapons[hasMainWeapon].name === 'weapon_awp')
    const isDead = state.health === 0

    const hasBOMB = (team === 'T'
      ? (Object.keys(weapons)
        .find(weapon => weapons[weapon].type === 'C4') !== undefined)
      : null)

    const moneyLost = this.state.money - this.props.state.money

    return (
      <div className={`team-player
        ${first ? 'first' : ''}
        ${last ? 'last' : ''}
        ${watching ? ' watching' : ''}
        ${isDead ? ' dead' : ''}`}
      >
        <div className='dead-player-parent'>
          <div className={`dead-stats ${isDead ? 'visible' : ''}`}>
            <div className='dead-icon'>
              <img
                src='/static/utils/dead.png'
                height='60px'
              />
            </div>
          </div>
        </div>
        <div className='player-extra-stats-parent'>
          <div className={`player-extra-stats ${showStats ? 'show' : ''}`}>
            <div className='extra-money-lost'>
              <span className='minus'>-{Math.abs(moneyLost)}$</span>
            </div>
            <div className='extra-stats'>
              <div className='stats'>
                <div>K</div>
                <div>{stats.kills}</div>
              </div>
              <div className='stats'>
                <div>A</div>
                <div>{stats.assists}</div>
              </div>
              <div className='stats'>
                <div>D</div>
                <div>{stats.deaths}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flashed-container'>
          <div className='flashed-wrap' style={{ opacity: flashed !== 0 && !isDead ? (flashed / 255) - 0.1 : 0 }}>
            <img
              src='/static/utils/flashed.svg'
              height='65px'
            />
          </div>
        </div>
        <div className='player-container'>
          <div className='player-health-bar' style={{ width: `${state.health}%` }} />
          <div className='player-health-bar-lost' style={{ width: `${state.health}%` }} />
          <div className='player-health-background' />
          <div className='player-area-upper'>
            <div className={`player-weapon-main ${mainWeaponBig ? 'bigger' : ''}${mainWeaponBigger ? 'biggest' : ''}`}>
              {hasMainWeapon !== undefined && (
                <img
                  src={`/static/weapons/${weapons[hasMainWeapon].name}.svg`}
                  className={`weapon-wrap shadowed ${weapons[hasMainWeapon].state === 'holstered' ? 'holstered' : ''}`}
                  height='25px'
                />
              )}
            </div>
            <div className='player-name'>
              <div
                className='name'
              >{name}</div>
              <div className='data-divider'>|</div>
              <div className='spec-num'>{observerSlot}</div>
            </div>
            <div className='player-health'>
              {isDead ? '' : state.health}
            </div>
          </div>
        </div>
        <div className='player-area-lower'>
          <div className='player-weapon-secondary'>
            <div className='player-pistol'>
              {hasSecondaryWeapon !== undefined && (
                <img
                  src={`/static/weapons/${weapons[hasSecondaryWeapon].name}.svg`}
                  className={`weapon-wrap shadowed ${weapons[hasSecondaryWeapon].state === 'holstered' ? 'holstered' : ''}`}
                  height='20px'
                />
              )}
            </div>
            <div className='weapon-grenades'>
              {Object.keys(weapons)
                .filter(weapon => weapons[weapon].type === 'Grenade')
                .map((grenade, index) =>
                  [...Array(weapons[grenade].ammo_reserve)].map((e, i) => (
                    <div className='player-grenade' key={`${index}-${i}`}>
                      <img
                        src={`/static/weapons/${weapons[grenade].name}.svg`}
                        className={`weapon-wrap shadowed ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                        height='20px'
                      />
                    </div>
                  ))
                )
              }
            </div>
          </div>
          <div className='player-money'>
            <p>${state.money}</p>
          </div>
          <div className={`player-utility`}>
            {state.helmet ? (
              <div className='item'>
                <img src={HEAD_ARMOR} height='23px' />
              </div>
            ) : state.armor > 0 ? (
              <div className='item'>
                <img src={ARMOR} height='23px' />
              </div>
            ) : null
            }

            {team === 'CT' ? state.defusekit ? (
              <div className='item-util defuser'>
                <img src='/static/utils/defuser.svg' height='22px' />
              </div>
            ) : null : hasBOMB && (
              <div className='item-util'>
                <img src='/static/utils/c4.svg' height='26px' />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Player
