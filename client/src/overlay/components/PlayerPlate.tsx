import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Player } from 'csgo-gsi-types'

import {
  AllPlayers,
  StateTeamConfig
} from '../types'

import {
  State
} from '../../types'

import {
  ConfigState
} from '../../common/types'

import HEAD_ARMOR from '../../assets/util/armor_head.svg'
import ARMOR from '../../assets/util/armor.svg'

interface Props {
  player: Player | null,
  allPlayers: AllPlayers | null,
  config: ConfigState,
  teamConfiguration: StateTeamConfig
}

class PlayerPlate extends PureComponent<Props> {
  render () {
    const {
      player,
      allPlayers,
      teamConfiguration: { players, teamA, teamB },
      config
    } = this.props

    if (!player || !allPlayers) {
      return <div />
    }

    const isWatching = (player.spectarget !== undefined)

    const hasExtraInfo = (players[player.steamid] !== undefined)
    const extraInfoPlayer = players[player.steamid]

    const teamLogoPath = hasExtraInfo
      ? extraInfoPlayer.teamName === teamA.customName
        ? teamA.customLogo !== null ? teamA.customLogo : null
        : extraInfoPlayer.teamName === teamB.customName
          ? teamB.customLogo !== null ? teamB.customLogo : null
          : null
      : null

    // TODO: TEST THIS
    if (allPlayers[player.steamid] === undefined) return null

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const weapons: any = allPlayers[player.steamid].weapons
    const currentWeaponID = Object.keys(weapons).find(key => weapons[key].state === 'active')

    if (currentWeaponID === undefined) return null

    const { assists, deaths, kills } = allPlayers[player.steamid].match_stats
    const currentWeapon = weapons[currentWeaponID]
    const hasBOMB = (player.team === 'T'
      ? (Object.keys(weapons)
        .find(weapon => weapons[weapon].type === 'C4') !== undefined)
      : null)

    if (isWatching) {
      return (
        <div className={`player-plate ${player.team} ${config.useRoundedCorners ? 'rounded' : ''}`}>
          <div className='grid'>
            <div className='grid-upper'>
              <div className='upper-team'>
                {teamLogoPath !== null && config.showTeamLogo
                  ? <img src={`/${teamLogoPath}`} /> : null
                }
              </div>
              <div className='upper-name'>
                <p className={player.name.length >= 10 ? 'long-name' : ''}>
                  {!config.usePreSetName
                    ? player.name
                    : hasExtraInfo && extraInfoPlayer.gameName !== null
                      ? extraInfoPlayer.gameName
                      : player.name
                  }
                </p>
              </div>
              <div className='upper-flag' />
            </div>
            <div className='grid-lower'>
              <div className='grid-health-container'>
                {config.showPlayerPhotoContainerAllways ? (
                  <div className='grid-player-image'>
                    <img src={`/${hasExtraInfo
                      ? extraInfoPlayer.imagePath !== null && extraInfoPlayer.hasImage
                        ? extraInfoPlayer.imagePath
                        : 'static/default/default-player.png'
                      : 'static/default/default-player.png'}`}
                    />
                  </div>
                ) : config.showPlayerPhotoIfSet
                    && hasExtraInfo
                    && extraInfoPlayer.hasImage
                    && extraInfoPlayer.imagePath !== null
                  ? <div className='grid-player-image'><img src={`/${extraInfoPlayer.imagePath}`} /></div>
                  : <React.Fragment />
                }
                <div className={`grid-lower-dark grid-hp ${
                  config.showPlayerPhotoContainerAllways
                  || (config.showPlayerPhotoIfSet && hasExtraInfo && extraInfoPlayer.hasImage) ? 'no-corner' : ''}`}
                >
                  <div className='item'>
                    <b>+</b>{player.state.health}
                  </div>
                  <div className='item'>
                    {player.state.helmet
                      ? (<img src={HEAD_ARMOR} className='icon-center' />)
                      : (<img src={ARMOR} className='icon-center' />)
                    }{player.state.armor}
                  </div>
                </div>
              </div>
              <div className='grid-lower-light grid-stats'>
                <div className='stats-kills-current single-row'>
                  {player.state.round_kills === 0 ? null : (
                    <React.Fragment>
                      <div className='logo'>
                        <img
                          src='/static/utils/dead.png'
                          height='18px'
                        />
                      </div>
                      <div className='kills team-highlight'>
                        {player.state.round_kills}
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
                  {player.team === 'CT' ? player.state.defusekit ? (
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
                    .map((grenade, index) =>
                      [...Array(weapons[grenade].ammo_reserve)].map((e, i) => (
                        <div className='player-grenade' key={`${index}-${i}`}>
                          <img
                            src={`/static/weapons/${weapons[grenade].name}.svg`}
                            className={`weapon-wrap ${weapons[grenade].state === 'holstered' ? 'holstered' : ''}`}
                            height='24px'
                          />
                        </div>
                      ))
                    )
                  }
                </div>
                <div className='item'>
                  {currentWeapon.ammo_clip !== undefined ? (
                    <>
                      <span
                        className='ammo-main'
                      >{currentWeapon.ammo_clip}</span>
                      <span
                        className='ammo-off'
                      >/{currentWeapon.ammo_reserve}</span>
                    </>
                  ) : null
                  }
                </div>

              </div>
            </div>
            <div className='grid-add' />
          </div>
        </div>
      )
    }
    else {
      return (null)
    }
  }
}

const mapStateToProps = (state: State) => ({
  player: state.overlay.gameStatePlayer,
  allPlayers: state.overlay.gameStateAllPlayer,
  config: state.common.config,
  teamConfiguration: state.overlay.teamConfiguration
})

export default connect(mapStateToProps)(PlayerPlate)
