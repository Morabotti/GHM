// @flow
import React, { PureComponent, Fragment } from 'react'

import type { Teams } from '../types'

type Props = {
  playerNumber: number,
  playerTeam: Teams,
  playerPosition: Array<number>,
  playerForward: Array<number>,
  playerDead: boolean,
  key: number,
  isSpectating: boolean,
  prefixX: number,
  prefixY: number,
  scale: number,
  size: number,
  fontSize: number
}

type ComponentState = {
  deathPosX: number,
  deathPosY: number
}

class Radar extends PureComponent<Props, ComponentState> {
  state = {
    deathPosX: -30,
    deathPosY: -30
  }

  _calculateXPosition = () => {
    const { playerPosition, prefixX, scale, size } = this.props

    if (isNaN(playerPosition[0])) return
    return (Math.abs((playerPosition[0] - prefixX) / scale) - size / 2)
  }

  _calculateYPosition = () => {
    const { playerPosition, prefixY, scale, size } = this.props

    if (isNaN(playerPosition[1])) return
    return (Math.abs((playerPosition[1] - prefixY) / scale) - size / 2)
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
    const {
      playerNumber,
      playerTeam,
      playerDead,
      playerForward,
      isSpectating,
      size,
      fontSize
    } = this.props

    const deg = this._calcDegree(playerForward[1], playerForward[0])

    return (
      <foreignObject
        x={playerDead ? this.state.deathPosX : this._calculateXPosition()}
        y={playerDead ? this.state.deathPosY : this._calculateYPosition()}
        width={size}
        height={size}
        className={`${playerDead ? 'dead' : ''}`}
      >
        {!playerDead
          ? <Fragment>
            <div
              className={`radar-player ${playerTeam} ${isSpectating ? 'spectating' : ''}`}
            >
              <span style={{ fontSize: fontSize }}>{playerNumber}</span>
            </div>
            <div
              className={`radar-player-triangle ${playerDead ? 'dead' : ''}`}
              style={{
                transform: `rotate(${deg}deg)`,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                bottom: `${size / 2}px`,
                borderBottom: `${size - 10}px solid white`
              }}
            >
              <img
                src='/static/utils/radar-cone.svg'
                className={`cone ${isSpectating ? 'spectating' : ''}`}
              />
            </div>
          </Fragment>
          : <div className={`radar-player-dead ${playerTeam}`}>X</div>
        }
      </foreignObject>
    )
  }
}

export default Radar
