// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import type { State } from '../../types'
import type { Teams, MapState } from '../types'

type Props = {
  playerNumber: number,
  playerTeam: Teams,
  playerPosition: Array<number>,
  playerForward: Array<number>,
  playerDead: boolean,
  key: number,
  map: MapState,
  isSpectating: boolean,
}

type ComponentState = {
  deathPosX: number,
  deathPosY: number,
  prefixX: number,
  prefixY: number,
  scale: number
}

const PLAYER_SIZE = 40

class Radar extends PureComponent<Props, ComponentState> {
  state = {
    deathPosX: -30,
    deathPosY: -30,
    prefixX: 0,
    prefixY: 0,
    scale: 0
  }

  componentWillMount () {
    const { map } = this.props
    this.setState({
      prefixX: getMapPrefix(map.name)[0],
      prefixY: getMapPrefix(map.name)[1],
      scale: getMapScale(map.name)
    })
  }

  _calculateXPosition = () => {
    const { playerPosition } = this.props
    const { prefixX, scale } = this.state

    if (isNaN(playerPosition[0])) return

    return (Math.abs((playerPosition[0] - (prefixX)) / scale) - PLAYER_SIZE/2)
  }

  _calculateYPosition = () => {
    const { playerPosition } = this.props
    const { prefixY, scale } = this.state

    if (isNaN(playerPosition[1])) return

    return (Math.abs((playerPosition[1] - (prefixY)) / scale) - PLAYER_SIZE/2)
  }

  componentWillUpdate (nextProp: Props) {
    const { playerDead } = this.props
    if (nextProp.playerDead && !playerDead) {
      this.setState({
        deathPosX: this._calculateXPosition(),
        deathPosY: this._calculateYPosition()
      })
    }
  }

  _calcDegree = (x: number, y: number) => Math.atan2(y, x) * (180 / Math.PI)

  render () {
    const { playerNumber, playerTeam, playerDead, playerForward, isSpectating } = this.props

    const deg = this._calcDegree(playerForward[1], playerForward[0])
    
    return (
      <foreignObject
        x={playerDead ? this.state.deathPosX : this._calculateXPosition()}
        y={playerDead ? this.state.deathPosY : this._calculateYPosition()}
        width={PLAYER_SIZE}
        height={PLAYER_SIZE}
        key={this.props.key}
      >
        <div
          className={`radar-player ${playerTeam} ${playerDead ? 'dead' : ''} ${isSpectating ? 'spectating' : ''}`}
        >
          <span>{playerNumber}</span>
        </div>
        <div
          className={`radar-player-triangle ${playerDead ? 'dead' : ''}`}
          style={{
            transform: `rotate(${deg}deg)`,
            borderLeft: `${PLAYER_SIZE/2}px solid transparent`,
            borderRight: `${PLAYER_SIZE/2}px solid transparent`,
            bottom: `${PLAYER_SIZE/2}px`,
            borderBottom: `${PLAYER_SIZE - 10}px solid white`
          }}
        />
      </foreignObject>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap
})

export default connect(mapStateToProps)(Radar)
