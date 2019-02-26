// @flow
import React, { PureComponent } from 'react'

import { connect } from 'react-redux'

import { RadarPlayer } from './'

import type { State } from '../../types'
import type { AllPlayers, Dispatch } from '../types'

type Props = {
  gameState: AllPlayers
}

class Radar extends PureComponent<Props> {
  render () {
    const { gameState } = this.props
    return (
      <div className='radar'>
        <div className='radar-wrap' >
          {Object.keys(gameState).map((key, index) => {
            const player = gameState[key];
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
  gameState: state.overlay.gameState
})

export default connect(mapStateToProps)(Radar)
