// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import type { State } from '../../types'
import type { Teams, MapState } from '../types'

type Props = {
  PlayerNumber: number,
  PlayerTeam: Teams,
  PlayerPosX: number,
  PlayerPosY: number,
  PlayerDead: boolean,
  key: number,
  map: MapState
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
    const { PlayerPosX, map } = this.props
    const prefix = getMapPrefix(map.name)[0]
    const scale = getMapScale(map.name)[0]

    if (isNaN(PlayerPosX)) return
    if (PlayerPosX < 0) {
      return (Math.abs(PlayerPosX) * (-scale)) + prefix
    } else {
      return (PlayerPosX * scale) + prefix
    }
  }

  _calculateYPosition = () => {
    const { PlayerPosY, map } = this.props
    
    const prefix = getMapPrefix(map.name)[1]
    const scale = getMapScale(map.name)[1]

    if (isNaN(PlayerPosY)) return
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
        deathPosY: this._calculateYPosition()
      })
    }
  }

  render () {
    const { PlayerNumber, PlayerTeam, PlayerDead } = this.props
    return (
      <foreignObject
        x={PlayerDead ? this.state.deathPosX : this._calculateXPosition()}
        y={PlayerDead ? this.state.deathPosY : this._calculateYPosition()}
        width={48}
        height={48}
        key={this.props.key}
      >
        <div
          className={`radar-player ${PlayerTeam} ${PlayerDead ? 'dead' : ''}`}
        >
          <span>{PlayerNumber}</span>
        </div>
      </foreignObject>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap
})

export default connect(mapStateToProps)(Radar)
