// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { State } from '../../types'
import type { PhaseCooldowns, MapState } from '../types'

type Props = {
  mapData: MapState,
  phaseData: PhaseCooldowns
}

const BOMB_TIMER = 45

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
          <div className='score-area CT'>
            <div className='team-logo'>
              <img src='/static/teams/team_ct.png' />
            </div>
            <div className={`team-name ${team_ct.name === undefined ? 'smaller' : ''}`}>
              {team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'}
            </div>
            <div className='team-score'>
              {team_ct.score}
            </div>
          </div>
          <div className='score-time'>
            {phase === 'bomb' ? (
              <React.Fragment>
                <div
                  className='bomb-timer'
                  style={{ height: `${100 - ((phase_ends_in/BOMB_TIMER) * 100)}%` }}
                />
                <div className='bomb-wrapper' style={{animationDuration: `${(phase_ends_in/BOMB_TIMER)+0.35}s`}}>
                  <img src='/static/utils/bomb.svg' className='bomb-icon' />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='time'>
                  {phase === 'live' || phase === 'freezetime' ? this.sectostr(Math.trunc(phase_ends_in)) : phase === 'over' ? '0:00' : null }
                </div>
                <div className='round'>
                  {phase === 'warmup' ? ('WARMUP') : (`Round ${round + 1}/30`)}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className='score-area T'>
            <div className='team-logo'>
              <img src='/static/teams/team_t.png' />
            </div>
            <div className={`team-name ${team_ct.name === undefined ? 'smaller' : ''}`}>
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
