// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Player } from './'

import { calculateNadeGrade } from '../lib/NadeGrade'

import type { State } from '../../types'
import type { Teams, AllPlayers, PhaseCooldowns, NadeCalculation } from '../types'

type Props = {
  team: Teams,
  allPlayers: AllPlayers,
  phaseData: PhaseCooldowns,
  teamStats: NadeCalculation
}

class Team extends PureComponent<Props> {
  render () {
    const { team, allPlayers, teamStats } = this.props
    const isOnStart = this.props.phaseData.phase === 'freezetime'
    const nadeGrade = calculateNadeGrade(teamStats[team])

    return (
      <div className={`team ${team}`}>
        <div className={`team-container ${isOnStart ? 'show' : ''}`}>
          <div className='team-info'>
            <div className='desc'>
              <div>
                Utility level - <span className={`color-grades ${nadeGrade.text}`}>{nadeGrade.output}</span>
              </div>
            </div>
            <div className='utils'>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src='/static/weapons/weapon_smokegrenade.svg' />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].smokes}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src='/static/weapons/weapon_hegrenade.svg' />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].grenades}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon'>
                  <img src='/static/weapons/weapon_incgrenade.svg' />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].molotovs}</div>
              </div>
              <div className='team-grenade-area'>
                <div className='icon decoy'>
                  <img src='/static/weapons/weapon_decoy.svg' />
                </div>
                <div className='multi'>X</div>
                <div className='amount'>{teamStats[team].flashes}</div>
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
  teamStats: state.overlay.teamStats
})

export default connect(mapStateToProps)(Team)
