// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import type { Teams, AllPlayers } from '../types'
import { connect } from 'react-redux'

import { Player } from './'

type Props = {
  team: Teams,
  allPlayers: AllPlayers
}

class Team extends PureComponent<Props> {
  render () {
    const { team, allPlayers } = this.props
    return (
      <div className={`team ${team}`}>
        <div className='team-info' />
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
  allPlayers: state.overlay.gameStateAllPlayer
})

export default connect(mapStateToProps)(Team)
