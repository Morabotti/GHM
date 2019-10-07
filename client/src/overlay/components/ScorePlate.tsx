import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
  ScoreAnnouncement,
  DefuseAnnouncement,
  ScoreTime,
  MapScoreAnnoucement,
  TimeoutAnnoucement
} from './'

import { State } from '../../types'
import { ConfigState } from '../../common/types'

import {
  Map,
  PhaseCountDown,
  Round
} from 'csgo-gsi-types'

import {
  StateTeamConfig,
  Bomb,
  AllPlayers
} from '../types'

interface Props {
  mapData: Map | null,
  phaseData: PhaseCountDown | null,
  teamConfiguration: StateTeamConfig,
  bomb: Bomb | null,
  allPlayers: AllPlayers | null,
  gameStateRound: Round | null,
  config: ConfigState
}

interface ComponentState {
  bombTimerLeft: number,
  plantedBomb: boolean,
  defuserHasKit: boolean
}

const EVENT_TIMEOUT = 5000

class ScorePlate extends PureComponent<Props, ComponentState> {
  private bombTimeout: NodeJS.Timeout | undefined
  private defuseTimeout: NodeJS.Timeout | undefined

  constructor (props: Props) {
    super(props)
    this.state = {
      plantedBomb: false,
      bombTimerLeft: 10,
      defuserHasKit: false
    }
  }

  componentDidUpdate (prevProp: Props) {
    const { bomb } = this.props
    if (bomb && prevProp.bomb) {
      if (prevProp.bomb.state === 'planting' && bomb.state === 'planted') {
        this.setState({ plantedBomb: true })
        this.bombTimeout = setTimeout(
          this._removeBombNotify,
          EVENT_TIMEOUT
        )
      }

      if (prevProp.bomb.state === 'planted' && bomb.state === 'defusing') {
        this.setState({
          defuserHasKit: Number(bomb.countdown) < 6
        })
      }
    }
  }

  componentWillUnmount () {
    if (this.bombTimeout) {
      clearTimeout(this.bombTimeout)
    }
    if (this.defuseTimeout) {
      clearTimeout(this.defuseTimeout)
    }
  }

  _removeBombNotify = () => this.setState({ plantedBomb: false })

  render () {
    const {
      phaseData,
      mapData,
      teamConfiguration: {
        teamA,
        teamB,
        scoreA,
        scoreB,
        format
      },
      bomb,
      gameStateRound,
      config
    } = this.props
    if (!phaseData || !mapData) {
      return <div />
    }

    const { phase_ends_in, phase } = phaseData
    const { round, team_ct, team_t } = mapData

    const {
      bombTimerLeft,
      plantedBomb,
      defuserHasKit
    } = this.state

    const isWin = (gameStateRound !== null && gameStateRound.win_team !== undefined)

    const aTeamWin = isWin
      && gameStateRound !== null
      && gameStateRound.win_team === teamA.team

    const bTeamWin = isWin
      && gameStateRound !== null
      && gameStateRound.win_team === teamB.team

    const showBomb = bomb ? (
      bomb.state === 'planted'
      || bomb.state === 'defusing'
      || bomb.state === 'exploded'
      || bomb.state === 'defused'
    ) : false

    const displayBomb = bomb ? (
      bomb.state === 'planted'
      || bomb.state === 'defusing'
    ) : false

    const stopBombEffects = bomb ? (
      bomb.state === 'exploded'
      || bomb.state === 'defused'
    ) : false

    const eventText = (aTeamWin || bTeamWin)
      ? 'WINS THE ROUND'
      : plantedBomb
        ? 'PLANTED THE BOMB'
        : ''

    const showScores = isWin
      || (bomb ? bomb.state === 'defusing' : false)
      || plantedBomb

    const teamAName = teamA.customName !== null
      ? teamA.customName
      : teamA.team === 'CT'
        ? team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'
        : team_t.name !== undefined ? team_t.name : 'TERRORISTS'

    const teamBName = teamB.customName !== null
      ? teamB.customName
      : teamB.team === 'T'
        ? team_t.name !== undefined ? team_t.name : 'TERRORISTS'
        : team_ct.name !== undefined ? team_ct.name : 'COUNTER-TERRORISTS'

    const teamATimeout = (teamA.team === 'CT' && phase === 'timeout_ct')
      || (teamA.team === 'T' && phase === 'timeout_t')

    const teamBTimeout = (teamB.team === 'T' && phase === 'timeout_t')
      || (teamB.team === 'CT' && phase === 'timeout_ct')

    const teamATimeoutAmount = (teamA.team === 'CT'
      ? team_ct.timeouts_remaining
      : team_t.timeouts_remaining) - config.maxRounds + 1
    const teamBTimeoutAmount = (teamB.team === 'T'
      ? team_t.timeouts_remaining
      : team_ct.timeouts_remaining) - config.maxRounds + 1

    return (
      <div className={`score-top ${config.useRoundedCorners ? 'rounded' : ''}`}>
        <div className='score-top-upper'>
          <div className={`score-area-container ${teamA.team}`}>
            <ScoreAnnouncement
              planted={plantedBomb}
              win={aTeamWin}
              eventText={eventText}
            />
            <TimeoutAnnoucement
              timeout={teamATimeout}
              eventText={`${teamAName} timeout (${teamATimeoutAmount}/${config.maxRounds})`}
            />
            <DefuseAnnouncement
              defusing={bomb ? bomb.state === 'defusing' : false}
              hasKit={defuserHasKit}
              countdown={bomb ? Number(bomb.countdown) : 45}
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
                {teamAName}
              </div>
              <div className='team-score'>
                {format && format.key !== 'bo1' && (
                  <MapScoreAnnoucement
                    hide={showScores}
                    max={format.matchesPerTeam}
                    won={scoreA}
                  />
                )}
                {teamA.team === 'CT'
                  ? team_ct.score
                  : team_t.score
                }
              </div>
            </div>
          </div>
          <div className='score-time'>
            {format && format.key !== 'bo1' && (
              <div className={`score-format ${showScores ? 'hide' : ''}`}>
                {format.text}
              </div>
            )}
            <ScoreTime
              showBomb={showBomb}
              useBombEffects={stopBombEffects}
              bombState={bomb ? bomb.state : 'carried'}
              bombActive={displayBomb}
              bombTimeLeft={bombTimerLeft}
              phase={phase}
              phaseTimer={phase_ends_in}
              round={round}
            />
          </div>
          <div className={`score-area-container ${teamB.team}`}>
            <ScoreAnnouncement
              planted={plantedBomb}
              win={bTeamWin}
              eventText={eventText}
            />
            <TimeoutAnnoucement
              timeout={teamBTimeout}
              eventText={`${teamBName} timeout (${teamBTimeoutAmount}/${config.maxRounds})`}
            />
            <DefuseAnnouncement
              defusing={bomb ? bomb.state === 'defusing' : false}
              hasKit={defuserHasKit}
              countdown={bomb ? Number(bomb.countdown) : 45}
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
                {teamBName}
              </div>
              <div className='team-score'>
                {format && format.key !== 'bo1' && (
                  <MapScoreAnnoucement
                    hide={showScores}
                    max={format.matchesPerTeam}
                    won={scoreB}
                  />
                )}
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
  gameStateRound: state.overlay.gameStateRound,
  allPlayers: state.overlay.gameStateAllPlayer,
  bomb: state.overlay.gameStateBomb,
  config: state.common.config
})

export default connect(mapStateToProps)(ScorePlate)
