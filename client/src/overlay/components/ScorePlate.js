// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { State } from '../../types'
import type { PhaseCooldowns, MapState, StateTeamConfig } from '../types'

type Props = {
  mapData: MapState,
  phaseData: PhaseCooldowns,
  teamConfiguration: StateTeamConfig
}

type ComponentState = {
  bombTimerLeft: number,
  showBomb: boolean
}

const BOMB_TIMER = 45

class ScorePlate extends PureComponent<Props, ComponentState> {
  state = {
    showBomb: false,
    bombTimerLeft: 0
  }

  componentDidUpdate (prevProp: Props) {
    if (prevProp.phaseData.phase === 'bomb' && this.props.phaseData.phase === 'defuse') {
      this.setState({
        showBomb: true,
        bombTimerLeft: prevProp.phaseData.phase_ends_in
      })
    } else if (this.props.phaseData.phase !== 'defuse' && this.state.showBomb) {
      this.setState({
        showBomb: false
      })
    }
  }

  sectostr (time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
  }

  render () {
    const { phase_ends_in, phase } = this.props.phaseData
    const { round, team_ct, team_t } = this.props.mapData
    const { teamA, teamB } = this.props.teamConfiguration
    const { showBomb, bombTimerLeft } = this.state
    return (
      <div className='score-top'>
        <div className='score-top-upper'>
          <div className={`score-area area-left ${teamA.team}`}>
            <div className='team-logo'>
              {teamA.team === 'CT'
                ? <img src='/static/teams/team_ct.png' />
                : <img src='/static/teams/team_t.png' />
              }
            </div>
            <div className={`team-name ${team_ct.name === undefined ? 'smaller' : ''}`}>
              {teamA.team === 'CT'
                ? team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'
                : team_t.name !== undefined ? team_t.name : 'TERRORISTS'
              }
            </div>
            <div className='team-score'>
              {teamA.team === 'CT'
                ? team_ct.score
                : team_t.score
              }
            </div>
          </div>
          <div className='score-time'>
            {phase === 'bomb' || showBomb ? (
              <React.Fragment>
                <div
                  className='bomb-timer'
                  style={{ height: `${100 - (((showBomb ? bombTimerLeft : phase_ends_in) / BOMB_TIMER) * 100)}%` }}
                />
                <div
                  className='bomb-wrapper'
                  style={{ animationDuration: `${((showBomb ? bombTimerLeft : phase_ends_in) / BOMB_TIMER) + 0.35}s` }}
                >
                  <img src='/static/utils/bomb.svg' className='bomb-icon' />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='time'>
                  {phase === 'live' || phase === 'freezetime' ? this.sectostr(Math.trunc(phase_ends_in)) : phase === 'over' ? '0:00' : null }
                </div>
                <div className='round'>
                  {phase === 'warmup' ? 'WARMUP' : `Round ${round + 1}/30`}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={`score-area area-right ${teamB.team}`}>
            <div className='team-logo'>
              {teamB.team === 'T'
                ? <img src='/static/teams/team_t.png' />
                : <img src='/static/teams/team_ct.png' />
              }
            </div>
            <div className={`team-name ${team_ct.name === undefined ? 'smaller' : ''}`}>
              {teamB.team === 'T'
                ? team_t.name !== undefined ? team_t.name : 'TERRORISTS'
                : team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'
              }
            </div>
            <div className='team-score'>
              {teamB.team === 'T'
                ? team_t.score
                : team_ct.score
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  mapData: state.overlay.gameStateMap,
  phaseData: state.overlay.gameStatePhase,
  teamConfiguration: state.overlay.teamConfiguration
})

export default connect(mapStateToProps)(ScorePlate)
