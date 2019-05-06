// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { CurrentPlayer, AllPlayers, StateTeamConfig } from '../types'
import type { State } from '../../types'

import HEAD_ARMOR from '../../assets/util/armor_head.svg'
import ARMOR from '../../assets/util/armor.svg'

type Props = {
  playerData: CurrentPlayer,
  allPlayers: AllPlayers,
  teamConfiguration: StateTeamConfig
}

class PlayerPlate extends PureComponent<Props> {
  render () {
    const {
      playerData: { name, team, state, steamid },
      allPlayers,
      teamConfiguration: { players, teamA, teamB }
    } = this.props

    const isWatching = (this.props.playerData.spectarget !== undefined)

    const hasExtraInfo = (players[steamid] !== undefined)
    const extraInfoPlayer = players[steamid]

    const teamLogoPath = hasExtraInfo
      ? extraInfoPlayer.teamName === teamA.customName
      ? teamA.customLogo !== null ? teamA.customLogo : null
      : extraInfoPlayer.teamName === teamB.customName
      ? teamB.customLogo !== null ? teamB.customLogo : null
      : null
      : null

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
              <div className='upper-team'>
                {teamLogoPath !== null ?
                  <img src={`/${teamLogoPath}`} /> : null
                }
              </div>
              <div className='upper-name'>
                <p className={name.length >= 10 ? 'long-name' : ''}>{name}</p>
              </div>
              <div className='upper-flag' />
            </div>
            <div className='grid-lower'>
              <div className='grid-health-container'>
                <div className='grid-player-image'>
                  <img src={`/${hasExtraInfo 
                    ? extraInfoPlayer.imagePath !== null && extraInfoPlayer.hasImage
                    ? extraInfoPlayer.imagePath
                    : 'static/default/default-player.png'
                    : 'static/default/default-player.png'}`}
                  />
                </div>
                <div className={`grid-lower-dark grid-hp no-corner`}>
                  <div className='item'>
                    <b>+</b>{state.health}
                  </div>
                  <div className='item'>
                    {state.helmet
                      ? (<img src={HEAD_ARMOR} className='icon-center' />)
                      : (<img src={ARMOR} className='icon-center' />)
                    }{state.armor}
                  </div>
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
                  <div className='raw-data'>{kills}</div>
                </div>
                <div className='two-rows stats-assists'>
                  <div className='team-highlight'>A</div>
                  <div className='raw-data'>{assists}</div>
                </div>
                <div className='two-rows stats-deaths'>
                  <div className='team-highlight'>D</div>
                  <div className='raw-data'>{deaths}</div>
                </div>
                <div className='two-rows stats-adr'>
                  <div className='team-highlight'>K/D</div>
                  <div className='raw-data'>{deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2)}</div>
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
  allPlayers: state.overlay.gameStateAllPlayer,
  teamConfiguration: state.overlay.teamConfiguration
})

export default connect(mapStateToProps)(PlayerPlate)
