// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

type Props = {
  playerData: any
}

class PlayerPlate extends PureComponent<Props> {
  render () {
    const { name, team, state } = this.props.playerData
    const isWatching = ('spectarget' in this.props.playerData)

    if (isWatching) {
      return (
        <div className={`player-plate ${team === 'CT' ? 'ct' : 't'}`}>
          <div className='grid'>
            <div className='grid-upper'>
              <p>{name}</p>
            </div>
            <div className='grid-lower'>
              <div className='grid-lower-dark grid-hp'>
                {`${state.health} / ${state.armor}`}
              </div>
              <div className='grid-lower-light grid-stats'>
                7 3 2 91
              </div>
              <div className='grid-lower-dark grid-ammo'>
                9 / 30
              </div>
            </div>
            <div className='grid-add' />
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = (state: State) => ({
  playerData: state.overlay.gameStatePlayer
})

export default connect(mapStateToProps)(PlayerPlate)
