// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

type Props = {}

class Team extends PureComponent<Props> {
  render () {
    return (
      <div className='team'>
        <div className='team-info'>
          sda
        </div>
        <div className='team-player'>
          <div className='player-area-left'>
            <div className='area-left-top'>
              Morabotti
            </div>
            <div className='area-left-top'>
              Kranade
            </div>
          </div>
          <div className='player-area-right'>
            <div className='area-right-top'>
              100
            </div>
            <div className='area-right-top'>
              on
            </div>
          </div>
        </div>
        <div className='team-player'>
          sda
        </div>
        <div className='team-player'>
          sda
        </div>
        <div className='team-player'>
          sda
        </div>
        <div className='team-player'>
          sda
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Team)
