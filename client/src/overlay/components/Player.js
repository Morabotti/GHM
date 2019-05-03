// @flow
import React, { PureComponent } from 'react'
import type { Weapons, PlayerState, MatchStats, Teams } from '../types'

type Props = {
  first?: boolean,
  last?: boolean,
  name: string,
  team: Teams,
  weapons: Weapons,
  state: PlayerState,
  stats: MatchStats,
  watching: boolean,
  observerSlot: string,
  showStats: boolean
}

type ComponentState = {
  money: number
}

class Player extends PureComponent<Props, ComponentState> {
  state = {
    money: 0
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.showStats && !prevProps.showStats)
      this.setState({ money: this.props.state.money })
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
      showStats
    } = this.props

    const hasMainWeapon = Object.keys(weapons)
      .find(weapon => weapons[weapon].type === 'Rifle' ||
        weapons[weapon].type === 'SniperRifle' ||
        weapons[weapon].type === 'Machine Gun' ||
        weapons[weapon].type === 'Shotgun' ||
        weapons[weapon].type === 'Submachine Gun')

    const hasSecondaryWeapon = Object.keys(weapons)
      .find(weapon => weapons[weapon].type === 'Pistol')

    // Prolly should be done with weapon type instead
    const mainWeaponBig = (hasMainWeapon !== undefined &&
      (weapons[hasMainWeapon].name === 'weapon_nova' ||
      weapons[hasMainWeapon].name === 'weapon_xm1014')
    )

    const mainWeaponBigger = (hasMainWeapon !== undefined && weapons[hasMainWeapon].name === 'weapon_awp')
    const isDead = state.health === 0

    const hasBOMB = (team === 'T'
      ? (Object.keys(weapons)
        .find(weapon => weapons[weapon].type === 'C4') !== undefined)
      : null)

    const moneyLost = this.state.money - this.props.state.money

    return (
      <div className={`team-player ${first ? 'first' : ''}${last ? 'last' : ''} ${watching ? 'watching' : ''} ${isDead ? 'dead' : ''}`}>
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
              {moneyLost === 0 ? (
                <span className='plus'>{moneyLost}$</span>
              ) : (
                <span className='minus'>-{moneyLost}$</span>
              )}
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
        <div className='player-container'>
          <div className='player-health-bar' style={{ width: `${state.health}%` }} />
          <div className='player-health-bar-lost' style={{ width: `${state.health}%` }} />
          <div className='player-health-background' />
          <div className='player-area-upper'>
            <div className={`player-weapon-main ${mainWeaponBig ? 'bigger' : ''}${mainWeaponBigger ? 'biggest' : ''}`}>
              { hasMainWeapon !== undefined ? (
                <img
                  src={`/static/weapons/${weapons[hasMainWeapon].name}.svg`}
                  className={`weapon-wrap ${weapons[hasMainWeapon].state === 'holstered' ? 'holstered' : ''}`}
                  height='25px'
                />
              ) : null}
            </div>
            <div className='player-name'>
              <div className='name'>{name}</div><div className='data-divider'>|</div><div className='spec-num'>{observerSlot}</div>
            </div>
            <div className='player-health'>
              {isDead ? '' : state.health}
            </div>
          </div>
        </div>
        <div className='player-area-lower'>
          <div className='player-weapon-secondary'>
            <div className='player-pistol'>
              {hasSecondaryWeapon !== undefined ? (
                <img
                  src={`/static/weapons/${weapons[hasSecondaryWeapon].name}.svg`}
                  className={`weapon-wrap ${weapons[hasSecondaryWeapon].state === 'holstered' ? 'holstered' : ''}`}
                  height='20px'
                />
              ) : null}
            </div>
            <div className='weapon-grenades'>
              {Object.keys(weapons)
                .filter(weapon => weapons[weapon].type === 'Grenade')
                .map((grenade, index) => {
                  if (weapons[grenade].ammo_reserve === 2) {
                    return (
                      <div className='multiple-grenades' key={index}>
                        <div className='player-grenade'>
                          <img
                            src={`/static/weapons/${weapons[grenade].name}.svg`}
                            className={`weapon-wrap ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                            height='20px'
                          />
                        </div>
                        <div className='player-grenade'>
                          <img
                            src={`/static/weapons/${weapons[grenade].name}.svg`}
                            className={`weapon-wrap ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                            height='20px'
                          />
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className='player-grenade' key={index}>
                        <img
                          src={`/static/weapons/${weapons[grenade].name}.svg`}
                          className={`weapon-wrap ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                          height='20px'
                        />
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
          <div className='player-money'>
            <p>${state.money}</p>
          </div>
          <div className={`player-utility`}>
            {state.helmet ? (
              <div className='item'>
                <img src='/static/utils/armor_helmet.png' height='26px' />
              </div>
            ) : state.armor > 0 ? (
              <div className='item'>
                <img src='/static/utils/armor.png' height='26px' />
              </div>
            ) : null
            }

            {team === 'CT' ? state.defusekit ? (
              <div className='item-util defuser'>
                <img src='/static/utils/defuser.svg' height='22px' />
              </div>
            ) : null : hasBOMB ? (
              <div className='item-util'>
                <img src='/static/utils/c4.svg' height='26px' />
              </div>
            ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Player
