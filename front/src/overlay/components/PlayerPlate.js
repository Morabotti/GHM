// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

type Props = {}

class PlayerPlate extends PureComponent<Props> {
  render () {
    return (
      <div className='player-plate ct'>
        <div className='grid'>
          <div className='grid-upper'>
            <p>Morabotti</p>
          </div>
          <div className='grid-lower'>
            <div className='grid-lower-dark grid-hp'>
              100 / 100
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
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(PlayerPlate)
