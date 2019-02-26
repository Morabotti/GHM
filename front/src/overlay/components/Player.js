// @flow
import React, { PureComponent } from 'react'
import type { Weapons, PlayerState, MatchStats } from '../types'

type Props = {
  first?: boolean,
  last?: boolean,
  name: string,
  weapons: Weapons,
  state: PlayerState,
  stats: MatchStats,
  watching: boolean,
  observerSlot: string
}

class Player extends PureComponent<Props> {
  render () {
    const { first, last, name, observerSlot, state, weapons } = this.props

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
      (weapons[hasMainWeapon].name === 'weapon_awp' ||
      weapons[hasMainWeapon].name === 'weapon_nova' ||
      weapons[hasMainWeapon].name === 'weapon_xm1014')
    )

    return (
      <div className={`team-player ${first === true ? 'first' : ''}${last === true ? 'last' : ''}`}>
        <div className='player-area-upper'>
          <div className={`player-weapon-main ${MainWeaponBig ? 'bigger' : ''}`}>
            { hasMainWeapon !== undefined ? (
              <img src={`/static/weapons/${weapons[hasMainWeapon].name}.svg`} className='weapon-wrap' height='25px' />
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
                <img src={`/static/weapons/${weapons[hasSecondaryWeapon].name}.svg`} className='weapon-wrap' height='20px' />
              ) : null}
            </div>
            <div className='player-grenade'>
              <img src='' className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src='' className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src='' className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src='' className='weapon-wrap' height='20px' />
            </div>
          </div>
          <div className='player-money'>
            <p>${state.money}</p>
          </div>
          <div className='player-utility'>
            <p>KIT</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Player
