// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RadarPlayer } from './'

import type { State } from '../../types'
import type { AllPlayers, MapState } from '../types'

type Props = {
  allPlayers: AllPlayers,
  map: MapState
}

class Radar extends PureComponent<Props> {
  render () {
    const { allPlayers, map } = this.props
    if(map.name === '') return <div>Loading Radar</div>

    return (
      <div className='radar'>
        <svg
          viewBox='0 0 1024 1024'
          className='wrap'
          style={{ backgroundImage: `url(/static/map/${map.name}_radar.png)` }}
        >
          {Object.keys(allPlayers).map((key, index) => {
            const player = allPlayers[key]
            return (
              <RadarPlayer
                key={index}
                playerNumber={player.observer_slot}
                playerTeam={player.team}
                playerPosX={player.position[0]}
                playerPosY={player.position[1]}
                playerDead={player.state.health === 0}
              />
            )
          })}
        </svg>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap,
  allPlayers: state.overlay.gameStateAllPlayer
})

export default connect(mapStateToProps)(Radar)
