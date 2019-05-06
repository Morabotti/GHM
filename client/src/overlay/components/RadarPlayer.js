// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import type { State } from '../../types'
import type { Teams, MapState } from '../types'

type Props = {
  playerNumber: number,
  playerTeam: Teams,
  playerPosX: number,
  playerPosY: number,
  playerDead: boolean,
  key: number,
  map: MapState
}

type ComponentState = {
  deathPosX: number,
  deathPosY: number,
  prefixX: number,
  prefixY: number,
  scale: number
}

const PLAYER_SIZE = 5

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
    const { playerPosX } = this.props
    const { prefixX, scale } = this.state

    if (isNaN(playerPosX)) return

    return (Math.abs((playerPosX - (prefixX)) / scale) - PLAYER_SIZE/2)
  }

  _calculateYPosition = () => {
    const { playerPosY } = this.props
    const { prefixY, scale } = this.state

    if (isNaN(playerPosY)) return

    return (Math.abs((playerPosY - (prefixY)) / scale) - PLAYER_SIZE/2)
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

  render () {
    const { playerNumber, playerTeam, playerDead } = this.props
    return (
      <foreignObject
        x={playerDead ? this.state.deathPosX : this._calculateXPosition()}
        y={playerDead ? this.state.deathPosY : this._calculateYPosition()}
        width={PLAYER_SIZE}
        height={PLAYER_SIZE}
        key={this.props.key}
      >
        <div
          className={`radar-player ${playerTeam} ${playerDead ? 'dead' : ''}`}
        >
          <span>{playerNumber}</span>
        </div>
      </foreignObject>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap
})

export default connect(mapStateToProps)(Radar)
