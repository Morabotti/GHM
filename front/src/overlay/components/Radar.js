// @flow
import React, { PureComponent } from 'react'

import { connect } from 'react-redux'

import { RadarPlayer } from './'

import type { State } from '../../types'
import type { AllPlayers } from '../types'

type Props = {
  allPlayers: AllPlayers
}

class Radar extends PureComponent<Props> {
  render () {
    const { allPlayers } = this.props
    return (
      <div className='radar'>
        <div className='radar-wrap' >
          {Object.keys(allPlayers).map((key, index) => {
            const player = allPlayers[key]
            return (
              <RadarPlayer
                key={index}
                PlayerNumber={player.observer_slot}
                PlayerTeam={player.team}
                PlayerPosX={player.position[0]}
                PlayerPosY={player.position[1]}
                PlayerDead={player.state.health === 0}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  allPlayers: state.overlay.gameStateAllPlayer
})

export default connect(mapStateToProps)(Radar)
