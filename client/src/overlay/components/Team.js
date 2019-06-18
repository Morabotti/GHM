// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Player } from './'

import {
  calculateNadeGrade,
  calculateEconomyGrade
} from '../lib/TeamCalculationGrade'

import type { State } from '../../types'
import type { ConfigState } from '../../common/types'
import type { Teams, AllPlayers, PhaseCooldowns, TeamStats } from '../types'

type Props = {
  team: Teams,
  allPlayers: AllPlayers,
  phaseData: PhaseCooldowns,
  teamStats: TeamStats,
  config: ConfigState
}

class Team extends PureComponent<Props> {
  render () {
    const { team, allPlayers, teamStats, config } = this.props
    const isOnStart = this.props.phaseData.phase === 'freezetime'
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
          .map((player, index) => (
            <Player
              key={player}
              team={team}
              first={index === 0}
              last={index === 4}
              flashed={allPlayers[player].state.flashed}
              showStats={isOnStart}
              name={allPlayers[player].name}
              weapons={allPlayers[player].weapons}
              state={allPlayers[player].state}
              stats={allPlayers[player].match_stats}
              watching={allPlayers[player].watching}
              observerSlot={allPlayers[player].observer_slot}
            />
          )
          )}
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  allPlayers: state.overlay.gameStateAllPlayer,
  phaseData: state.overlay.gameStatePhase,
  teamStats: state.overlay.teamStats,
  config: state.common.config
})

export default connect(mapStateToProps)(Team)
