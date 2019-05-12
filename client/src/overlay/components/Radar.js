// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RadarPlayer } from './'

import type { State } from '../../types'
import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import type {
  AllPlayers,
  MapState,
  BombState
} from '../types'

type Props = {
  allPlayers: AllPlayers,
  map: MapState,
  bomb: BombState
}

type ComponentState = {
  prefixX: number,
  prefixY: number,
  scale: number
}

const RADAR_ENABLE = true
const BOMB_SIZE = 40

class Radar extends PureComponent<Props, ComponentState> {
  state = {
    prefixX: 0,
    prefixY: 0,
    scale: 0
  }

  componentWillMount () {
    const { map } = this.props

    if(map.name !== undefined) {
      this.setState({
        prefixX: getMapPrefix(map.name)[0],
        prefixY: getMapPrefix(map.name)[1],
        scale: getMapScale(map.name)
      })
    }
  }

  // ! CHANGE WHOLE CALCULATIONS TO HERE?
  // * OR MAYBE JUST CHANGE BOMB TO DIFFERENT ELEMENT +1
  _calculateXPosition = (x: number) => {
    if (isNaN(x)) return

    return (Math.abs((x - (this.state.prefixX)) / this.state.scale) - BOMB_SIZE/2)
  }

  _calculateYPosition = (y: number) => {
    if (isNaN(y)) return

    return (Math.abs((y - (this.state.prefixY)) / this.state.scale) - BOMB_SIZE/2)
  }

  render () {
    const { allPlayers, map, bomb } = this.props
    if (!RADAR_ENABLE)
      return <div />

    if (map.name === '')
      return <div />
    
    const showBomb = /*(bomb.state !== 'carried' && bomb.state !== 'planting')*/ false

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
          
          {showBomb ? 
            <foreignObject
              x={this._calculateXPosition(bomb.position[0])}
              y={this._calculateYPosition(bomb.position[1])}
              width={BOMB_SIZE}
              height={BOMB_SIZE}
              className='bomb-area'
            >
              
            </foreignObject> : null
          }
        </svg>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap,
  allPlayers: state.overlay.gameStateAllPlayer,
  bomb: state.overlay.gameStateBomb
})

export default connect(mapStateToProps)(Radar)
