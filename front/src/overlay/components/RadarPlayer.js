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
  scaleX: number,
  scaleY: number
}

class Radar extends PureComponent<Props, ComponentState> {
  state = {
    deathPosX: -30,
    deathPosY: -30,
    prefixX: 0,
    prefixY: 0,
    scaleX: 0,
    scaleY: 0
  }

  componentWillMount() {
    const { map } = this.props
    this.setState({
      prefixX: getMapPrefix(map.name)[0],
      prefixY: getMapPrefix(map.name)[1],
      scaleX: getMapScale(map.name)[0],
      scaleY: getMapScale(map.name)[1]
    })
  }

  _calculateXPosition = () => {
    const { playerPosX } = this.props
    const { prefixX, scaleX } = this.state

    if (isNaN(playerPosX)) return

    if (playerPosX < 0)
      return (Math.abs(playerPosX) * (-scaleX)) + prefixX
    else 
      return (playerPosX * scaleX) + prefixX
  }

  _calculateYPosition = () => {
    const { playerPosY } = this.props
    const { prefixY, scaleY } = this.state

    if (isNaN(playerPosY)) return

    if (playerPosY < 0)
      return (Math.abs(playerPosY) * (-scaleY)) + prefixY
    else
      return (playerPosY * scaleY) + prefixY
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
        width={48}
        height={48}
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
