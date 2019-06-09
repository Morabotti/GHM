// @flow
/* eslint camelcase: [0] */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { ScoreAnnouncement } from './'
import { roundWinningTimeout } from '../lib/OtherCalculations'

import type { State } from '../../types'
import type {
  PhaseCooldowns,
  MapState,
  StateTeamConfig,
  BombState,
  AllPlayers
} from '../types'

type Props = {
  mapData: MapState,
  phaseData: PhaseCooldowns,
  teamConfiguration: StateTeamConfig,
  gameStateBomb: BombState,
  allPlayers: AllPlayers
}

type ComponentState = {
  bombTimerLeft: number,
  plantedBomb: boolean,
  aTeamWin: boolean,
  bTeamWin: boolean,
  defuserHasKit: boolean
}

const BOMB_TIMER = 40
const EVENT_TIMEOUT = 5000

class ScorePlate extends PureComponent<Props, ComponentState> {
  bombTimeout: window.TimerHandler
  defuseTimeout: window.TimerHandler
  aWinTimeout: window.TimerHandler
  bWinTimeout: window.TimerHandler

  state = {
    plantedBomb: false,
    bombTimerLeft: 10,
    aTeamWin: false,
    bTeamWin: false,
    defuserHasKit: false
  }

  componentDidUpdate (prevProp: Props) {
    const {
      phaseData: { phase },
      mapData: { team_ct, team_t },
      phaseData: { phase_ends_in },
      teamConfiguration: { teamA },
      gameStateBomb
    } = this.props

    if (prevProp.gameStateBomb.state === 'planting' && gameStateBomb.state === 'planted') {
      this.setState({ plantedBomb: true })
      this.bombTimeout = setTimeout(
        this._removeBombNotify,
        EVENT_TIMEOUT
      )
    }

    if (prevProp.gameStateBomb.state === 'planted' && gameStateBomb.state === 'defusing') {
      this.setState({
        defuserHasKit: Number(gameStateBomb.countdown) < 6
      })
    }

    if ((phase === 'over' || phase === 'bomb' || phase === 'live') &&
      prevProp.mapData.team_ct.score + 1 === team_ct.score
    ) {
      teamA.team === 'CT'
        ? this._setTeamAWin(phase_ends_in)
        : this._setTeamBWin(phase_ends_in)
    }

    if ((phase === 'over' || phase === 'bomb' || phase === 'live') &&
      prevProp.mapData.team_t.score + 1 === team_t.score
    ) {
      teamA.team === 'T'
        ? this._setTeamAWin(phase_ends_in)
        : this._setTeamBWin(phase_ends_in)
    }
  }

  _setTeamAWin = (phase: number) => {
    this.setState({ aTeamWin: true, defuserHasKit: false })
    this.aWinTimeout = setTimeout(
      this._removeTeamANotify,
      roundWinningTimeout(phase)
    )
  }

  _setTeamBWin = (phase: number) => {
    this.setState({ bTeamWin: true, defuserHasKit: false })
    this.bWinTimeout = setTimeout(
      this._removeTeamBNotify,
      roundWinningTimeout(phase)
    )
  }

  componentWillUnmount () {
    clearTimeout(this.bombTimeout)
    clearTimeout(this.defuseTimeout)
    clearTimeout(this.aWinTimeout)
    clearTimeout(this.bWinTimeout)
  }

  _removeBombNotify = () => this.setState({ plantedBomb: false })
  _removeTeamANotify = () => this.setState({ aTeamWin: false })
  _removeTeamBNotify = () => this.setState({ bTeamWin: false })

  sectostr (time) {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
  }

  render () {
    const {
      phaseData: { phase_ends_in, phase },
      mapData: { round, team_ct, team_t },
      teamConfiguration: { teamA, teamB },
      gameStateBomb: { state, countdown }
    } = this.props

    const {
      bombTimerLeft,
      plantedBomb,
      aTeamWin,
      defuserHasKit,
      bTeamWin
    } = this.state

    const showBomb = state === 'planted' || state === 'defusing' || state === 'exploded' || state === 'defused'
    const displayBomb = state === 'planted' || state === 'defusing'
    const stopBombEffects = state === 'exploded' || state === 'defused'
    const eventText = (aTeamWin || bTeamWin)
      ? 'WINS THE ROUND'
      : plantedBomb
        ? 'PLANTED THE BOMB'
        : ''

    return (
      <div className='score-top'>
        <div className='score-top-upper'>
          <div className={`score-area-container ${teamA.team}`}>
            <ScoreAnnouncement
              planted={plantedBomb}
              defusing={state === 'defusing'}
              win={aTeamWin}
              hasKit={defuserHasKit}
              eventText={eventText}
              countdown={Number(countdown)}
            />
            <div className='score-area area-left'>
              <div className='team-logo'>
                {teamA.customLogo !== null
                  ? <img src={`/${teamA.customLogo}`} />
                  : teamA.team === 'CT'
                    ? <img src='/static/teams/team_ct.png' />
                    : <img src='/static/teams/team_t.png' />
                }
              </div>
              <div className={`team-name smaller`}>
                {teamA.customName !== null
                  ? teamA.customName
                  : teamA.team === 'CT'
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
          </div>
          <div className='score-time'>
            {showBomb ? (
              <React.Fragment>
                <div className={`bomb-timer ${stopBombEffects ? state : ''}`} />
                <div
                  className={`bomb-wrapper ${stopBombEffects ? state : ''}`}
                  style={{
                    animationDuration: `${
                      stopBombEffects
                        ? 0
                        : ((displayBomb
                          ? bombTimerLeft
                          : phase_ends_in) / BOMB_TIMER) + 0.35}s` }}>
                  <img src='/static/utils/bomb.svg' className='bomb-icon' />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={`time ${(phase === 'live' && phase_ends_in <= 10) ? 'text-red' : ''}`}>
                  {phase === 'live' || phase === 'freezetime'
                    ? this.sectostr(Math.trunc(phase_ends_in) + 1)
                    : phase === 'over' ? '0:00' : null
                  }
                </div>
                <div className='round'>
                  {phase === 'warmup' ? 'WARMUP' : `Round ${round + 1}/30`}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={`score-area-container ${teamB.team}`}>
            <ScoreAnnouncement
              planted={plantedBomb}
              defusing={state === 'defusing'}
              win={bTeamWin}
              hasKit={defuserHasKit}
              eventText={eventText}
              countdown={Number(countdown)}
            />
            <div className='score-area area-right'>
              <div className='team-logo'>
                {teamB.customLogo !== null
                  ? <img src={`/${teamB.customLogo}`} />
                  : teamB.team === 'T'
                    ? <img src='/static/teams/team_t.png' />
                    : <img src='/static/teams/team_ct.png' />
                }
              </div>
              <div className={`team-name smaller`}>
                {teamB.customName !== null
                  ? teamB.customName
                  : teamB.team === 'T'
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
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  mapData: state.overlay.gameStateMap,
  phaseData: state.overlay.gameStatePhase,
  teamConfiguration: state.overlay.teamConfiguration,
  allPlayers: state.overlay.gameStateAllPlayer,
  gameStateBomb: state.overlay.gameStateBomb
})

export default connect(mapStateToProps)(ScorePlate)
