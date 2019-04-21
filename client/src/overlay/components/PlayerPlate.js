// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { CurrentPlayer, AllPlayers } from '../types'
import type { State } from '../../types'

type Props = {
  playerData: CurrentPlayer,
  allPlayers: AllPlayers
}

class PlayerPlate extends PureComponent<Props> {
  render () {
    const { name, team, state, steamid } = this.props.playerData
    const { allPlayers } = this.props

    const isWatching = (this.props.playerData.spectarget !== undefined)

    if (allPlayers[steamid] === 0 || allPlayers[steamid] === undefined) return null
    const weapons = allPlayers[steamid].weapons
    const currentWeaponID = Object.keys(weapons).find(key => weapons[key].state === 'active')
    if (currentWeaponID === undefined) return null

    const {assists, deaths, kills} = allPlayers[steamid].match_stats
    const currentWeapon = weapons[currentWeaponID]

    const hasBOMB = (team === 'T'
      ? (Object.keys(weapons)
        .find(weapon => weapons[weapon].type === 'C4') !== undefined)
      : null)

    if (isWatching) {
      return (
        <div className={`player-plate ${team}`}>
          <div className='grid'>
            <div className='grid-upper'>
              <p>{name}</p>
            </div>
            <div className='grid-lower'>
              <div className='grid-lower-dark grid-hp'>
                <div className='item'>
                  <b>+</b>{state.health}
                </div>
                <div className='item'>
                  {state.helmet
                    ? (<img src='/static/utils/armor_helmet.png' className='icon-center' />)
                    : (<img src='/static/utils/armor.png' className='icon-center' />)
                  }{state.armor}
                </div>
              </div>
              <div className='grid-lower-light grid-stats'>
                <div className='stats-kills-current single-row'>
                  {state.round_kills === 0 ? null : (
                    <React.Fragment>
                      <div className='logo'>
                        <img
                          src='/static/utils/dead.png'
                          height='18px'
                        />
                      </div>
                      <div className='kills team-highlight'>
                        {state.round_kills}
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className='two-rows stats-kills'>
                  <div className='team-highlight'>K</div>
                  <div>{kills}</div>
                </div>
                <div className='two-rows stats-assists'>
                  <div className='team-highlight'>A</div>
                  <div>{assists}</div>
                </div>
                <div className='two-rows stats-deaths'>
                  <div className='team-highlight'>D</div>
                  <div>{deaths}</div>
                </div>
                <div className='two-rows stats-adr'>
                  <div className='team-highlight'>K/D</div>
                  <div>{deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2)}</div>
                </div>
                <div className='stats-utility'>
                {team === 'CT' ? state.defusekit ? (
                  <img src='/static/utils/defuser.svg' height='32px' />
                ) : null : hasBOMB ? (
                  <img src='/static/utils/c4.svg' />
                ) : null
                }
                </div>
              </div>
              <div className='grid-lower-dark grid-ammo'>
                <div className='item grenades'>
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
                                height='24px'
                              />
                            </div>
                            <div className='player-grenade'>
                              <img
                                src={`/static/weapons/${weapons[grenade].name}.svg`}
                                className={`weapon-wrap ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                                height='24px'
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
                              height='24px'
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>
                <div className='item'>
                  {currentWeapon.ammo_clip !== undefined ? (
                    <React.Fragment>
                      <span className='ammo-main'>{currentWeapon.ammo_clip}</span><span className='ammo-off'>/{currentWeapon.ammo_reserve}</span>
                    </React.Fragment>
                  ) : null
                  }
                </div>

              </div>
            </div>
            <div className='grid-add' />
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = (state: State) => ({
  playerData: state.overlay.gameStatePlayer,
  allPlayers: state.overlay.gameStateAllPlayer
})

export default connect(mapStateToProps)(PlayerPlate)
