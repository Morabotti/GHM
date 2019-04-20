// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Player } from './'

import type { State } from '../../types'
import type { Teams, AllPlayers, PhaseCooldowns } from '../types'

type Props = {
  team: Teams,
  allPlayers: AllPlayers,
  phaseData: PhaseCooldowns
}

class Team extends PureComponent<Props> {
  render () {
    const { team, allPlayers } = this.props
    const isOnStart = this.props.phaseData.phase === 'freezetime'
    return (
      <div className={`team ${team}`}>
        <div className={`team-container ${isOnStart ? 'show' : ''}`}>
          <div className='team-info'>
            <div className='desc'>
              Utility level - <span className='poor'>Good</span>
            </div>
            <div className='utils'>

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
  phaseData: state.overlay.gameStatePhase
})

export default connect(mapStateToProps)(Team)
