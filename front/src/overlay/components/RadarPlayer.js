// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import type { Teams } from '../types'
import { connect } from 'react-redux'

type Props = {
  PlayerNumber: number,
  PlayerTeam: Teams,
  PlayerPosX: number,
  PlayerPosY: number
}

class Radar extends PureComponent<Props> {
  _calculateXPosition = () => {
    const { PlayerPosX } = this.props
    const scale = 0.07290
    const prefix = 224
    if (PlayerPosX < 0) {
      return (Math.abs(PlayerPosX) * (-scale)) + prefix
    } else {
      return (PlayerPosX * scale) + prefix
    }
  }

  _calculateYPosition = () => {
    const { PlayerPosY } = this.props
    const scale = -0.07300
    const prefix = 254
    if (PlayerPosY < 0) {
      return (Math.abs(PlayerPosY) * (-scale)) + prefix
    } else {
      return (PlayerPosY * scale) + prefix
    }
  }

  render () {
    const { PlayerNumber, PlayerTeam } = this.props
    return (
      <div
        className={`radar-player ${PlayerTeam === 'T' ? 't' : 'ct'}`}
        style={{
          left: this._calculateXPosition(),
          top: this._calculateYPosition()
        }}
      >
        <span>{PlayerNumber}</span>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Radar)
