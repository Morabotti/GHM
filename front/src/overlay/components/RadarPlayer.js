// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import type { Teams } from '../types'
import { connect } from 'react-redux'

type Props = {
  PlayerNumber: number,
  PlayerTeam: Teams,
  PlayerPosX: number,
  PlayerPosY: number,
  PlayerDead: boolean
}

class Radar extends PureComponent<Props> {
  state = {
    deathPosX: 0,
    deathPosY: 0,
  }

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

  componentWillUpdate (nextProp: Props) {
    // TODO: CHANGE THIS TO REDUX>
    const { PlayerDead } = this.props
    if (nextProp.PlayerDead === true && PlayerDead === false) {
      this.setState({
        deathPosX: this._calculateXPosition(),
        deathPosY: this._calculateYPosition(),
      })
    }
  }

  render () {
    const { PlayerNumber, PlayerTeam, PlayerDead } = this.props
    return (
      <div
        className={`radar-player ${PlayerTeam === 'T' ? 't' : 'ct'} ${PlayerDead ? 'dead' : ''}`}
        style={{
          left: PlayerDead ? this.state.deathPosX : this._calculateXPosition(),
          top: PlayerDead ? this.state.deathPosY : this._calculateYPosition()
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
