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

const RADAR_ENABLE = true

class Radar extends PureComponent<Props> {
  render () {
    const { allPlayers, map } = this.props
    if (!RADAR_ENABLE)
      return <div />

    if (map.name === '')
      return <div />

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
                key={player.observer_slot}
                playerNumber={player.observer_slot}
                playerTeam={player.team}
                playerPosition={player.position}
                playerForward={player.forward}
                playerDead={player.state.health === 0}
                isSpectating={player.watching}
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
