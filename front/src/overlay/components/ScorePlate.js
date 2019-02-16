// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

type Props = {}

class ScorePlate extends PureComponent<Props> {
  render () {
    return (
      <div className='score-top'>
        <div className='score-top-upper'>
          <div className='score-area ct'>
            <div className='team-logo'>
              <img src='/static/teams/team_ct.png' />
            </div>
            <div className='team-name'>
              ENCE
            </div>
            <div className='team-score'>
              0
            </div>
          </div>
          <div className='score-time'>
            <div className='time'>
              0:12
            </div>
            <div className='round'>
              Round 9/30
            </div>
          </div>
          <div className='score-area t'>
            <div className='team-logo'>
              <img src='/static/teams/team_t.png' />
            </div>
            <div className='team-name'>
              ENCE
            </div>
            <div className='team-score'>
              10
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(ScorePlate)
