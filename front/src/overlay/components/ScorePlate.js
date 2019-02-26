// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import type { PhaseCooldowns, MapState } from '../types'
import { connect } from 'react-redux'

type Props = {
  mapData: MapState,
  phaseData: PhaseCooldowns
}

class ScorePlate extends PureComponent<Props> {
  sectostr (time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
  }

  render () {
    const { phase_ends_in, phase } = this.props.phaseData
    const { round, team_ct, team_t } = this.props.mapData
    return (
      <div className='score-top'>
        <div className='score-top-upper'>
          <div className='score-area ct'>
            <div className='team-logo'>
              <img src='/static/teams/team_ct.png' />
            </div>
            <div className='team-name'>
              {team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'}
            </div>
            <div className='team-score'>
              {team_ct.score}
            </div>
          </div>
          <div className='score-time'>
            <div className='time'>
              {phase === 'live' || phase === 'warmup' ? this.sectostr(Math.trunc(phase_ends_in)) : null }
            </div>
            <div className='round'>
              {`Round ${round}/30`}
            </div>
          </div>
          <div className='score-area t'>
            <div className='team-logo'>
              <img src='/static/teams/team_t.png' />
            </div>
            <div className='team-name'>
              {team_t.name !== undefined ? team_t.name : 'TERRORISTS'}
            </div>
            <div className='team-score'>
              {team_t.score}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  mapData: state.overlay.gameStateMap,
  phaseData: state.overlay.gameStatePhase
})

export default connect(mapStateToProps)(ScorePlate)
