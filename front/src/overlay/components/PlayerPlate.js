// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { CurrentPlayer } from '../types'
import type { State } from '../../types'

type Props = {
  playerData: CurrentPlayer
}

class PlayerPlate extends PureComponent<Props> {
  render () {
    const { name, team, state } = this.props.playerData
    const isWatching = (this.props.playerData.spectarget !== undefined)

    if (isWatching) {
      return (
        <div className={`player-plate ${team}`}>
          <div className='grid'>
            <div className='grid-upper'>
              <p>{name}</p>
            </div>
            <div className='grid-lower'>
              <div className='grid-lower-dark grid-hp'>
                <div className='item'>
                  <b>+</b>{state.health}
                </div>
                {state.armor > 0 ? (
                  <div className='item'>
                    {state.helmet
                      ? (<img src='/static/utils/armor_helmet.svg' height='22px' />)
                      : (<img src='/static/utils/armor.svg' height='26px' />)
                    }{state.armor}
                  </div>
                ) : null}
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
