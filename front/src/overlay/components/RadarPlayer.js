// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import type { Teams } from '../types'
import { connect } from 'react-redux'

type Props = {
  PlayerNumber: number,
  PlayerTeam: Teams
}

class Radar extends PureComponent<Props> {

  _calculateXPosition = () => {
    const { PlayerPosX } = this.props
    return PlayerPosX
    //TODO: This
  }
  _calculateYPosition = () => {
    const { PlayerPosY } = this.props
    return PlayerPosY
     //TODO: This
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
