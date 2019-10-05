import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Player } from './'

import { TeamType, PhaseCountDown, Player as PlayerType } from 'csgo-gsi-types'

import {
  calculateNadeGrade,
  calculateEconomyGrade
} from '../lib/TeamCalculationGrade'

import { State } from '../../types'
import { ConfigState } from '../../common/types'
import { AllPlayers, TeamStats, PlayerConfig } from '../types'

interface Props {
  team: TeamType,
  allPlayers: AllPlayers | null,
  phase: PhaseCountDown | null,
  teamStats: TeamStats,
  player: PlayerType | null,
  configuredPlayers: {
    [key: string]: PlayerConfig
  },
  config: ConfigState
}

class Team extends PureComponent<Props> {
  render () {
    const { team, allPlayers, teamStats, config, phase, player, configuredPlayers } = this.props
    if (!allPlayers || !phase) {
      return <div />
    }

    const isOnStart = phase.phase === 'freezetime'
    const nadeGrade = calculateNadeGrade(teamStats[team].nades)
    const economyGrade = calculateEconomyGrade(teamStats[team].teamEconomy)

    return (
      <div className={`team ${team} ${config.useRoundedCorners ? 'rounded' : ''}`}>
        <div className={`team-container ${isOnStart ? 'show' : ''}`}>
          <div className='team-info'>
            <div className='desc'>
              <div>
                Utility level - <span className={`color-grades ${nadeGrade.text}`}>{nadeGrade.output}</span>
              </div>
              <div>
                Economy level - <span className={`color-grades ${economyGrade.text}`}>{economyGrade.output}</span>
              </div>
            </div>
            <div className='utils'>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src={`/static/teams/${team.toLowerCase()}/smoke.svg`} />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].nades.smokes}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src={`/static/teams/${team.toLowerCase()}/hegrenade.svg`} />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].nades.grenades}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src={`/static/teams/${team.toLowerCase()}/incgrenade.svg`} />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].nades.molotovs}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon decoy'>
                  <img src={`/static/teams/${team.toLowerCase()}/flash.svg`} />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].nades.flashes}</div>
              </div>
            </div>
          </div>
        </div>
        {Object.keys(allPlayers)
          .filter(key => {
            return allPlayers[key].team === team
          })
          .map((p, index) => (
            <Player
              key={p}
              team={team}
              first={index === 0}
              last={index === 4}
              flashed={allPlayers[p].state.flashed}
              showStats={isOnStart}
              name={configuredPlayers[p] ? configuredPlayers[p].gameName : allPlayers[p].name}
              weapons={allPlayers[p].weapons}
              state={allPlayers[p].state}
              stats={allPlayers[p].match_stats}
              watching={(player && player.steamid) === p}
              observerSlot={allPlayers[p].observer_slot}
            />
          )
          )}
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  allPlayers: state.overlay.gameStateAllPlayer,
  phase: state.overlay.gameStatePhase,
  teamStats: state.overlay.teamStats,
  player: state.overlay.gameStatePlayer,
  configuredPlayers: state.overlay.teamConfiguration.players,
  config: state.common.config
})

export default connect(mapStateToProps)(Team)
