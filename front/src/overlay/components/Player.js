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
  observerSlot: string
}

class Player extends PureComponent<Props> {
  render () {
    const { first, last, name, observerSlot, state, weapons, team, watching } = this.props

    const hasMainWeapon = Object.keys(weapons)
      .find(weapon => weapons[weapon].type === 'Rifle' ||
        weapons[weapon].type === 'SniperRifle' ||
        weapons[weapon].type === 'Machine Gun' ||
        weapons[weapon].type === 'Shotgun' ||
        weapons[weapon].type === 'Submachine Gun')

    const hasSecondaryWeapon = Object.keys(weapons)
      .find(weapon => weapons[weapon].type === 'Pistol')

    // Prolly should be done with weapon type instead
    const MainWeaponBig = (hasMainWeapon !== undefined &&
      (weapons[hasMainWeapon].name === 'weapon_nova' ||
      weapons[hasMainWeapon].name === 'weapon_xm1014')
    )

    const MainWeaponBigger = (hasMainWeapon !== undefined && weapons[hasMainWeapon].name === 'weapon_awp')

    const hasBOMB = (team === 'T'
      ? (Object.keys(weapons)
        .find(weapon => weapons[weapon].type === 'C4') !== undefined)
      : null)

    return (
      <div className={`team-player ${first === true ? 'first' : ''}${last === true ? 'last' : ''} ${watching ? 'watching' : ''}`}>
        <div className='player-area-upper'>
          <div className={`player-weapon-main ${MainWeaponBig ? 'bigger' : ''}${MainWeaponBigger ? 'biggest' : ''}`}>
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
            {state.health}
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
                <img src='/static/utils/armor_helmet.svg' height='26px' />
              </div>
            ) : state.armor > 0 ? (
              <div className='item'>
                <img src='/static/utils/armor.svg' height='26px' />
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
