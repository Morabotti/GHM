// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'
import { RadarPlayer } from './'

type Props = {}

class Radar extends PureComponent<Props> {
  render () {
    return (
      <div className='radar'>
        <div className='radar-wrap' >
          <RadarPlayer
            PlayerNumber={1}
            PlayerTeam={'CT'}
            PlayerPosX={233}
            PlayerPosY={90}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Radar)
