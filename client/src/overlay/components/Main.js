// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setActiveMatch } from '../actions'
import { setStatus } from '../../common/actions'
import { getStatus, getActiveMatch, subscribeToSocket } from '../client'
import { deepEqual } from '../../dashboard/lib/helpers'
import { PlayerPlate, Radar, ScorePlate, Team, GameLoader } from './'

import type { Dispatch, StateTeamConfig } from '../types'
import type { Status } from '../../dashboard/types'
import type { State } from '../../types'

// $FlowIgnore
import '../index.less'

type Props = {
  dispatch: Dispatch,
  status: Status,
  teamConfiguration: StateTeamConfig
}

class Main extends PureComponent<Props> {
  interval: window.TimerHandler

  componentDidMount () {
    this._getStatus()
    this._getActiveMatch()
    this.interval = setInterval(this._getStatus, 3000)
    subscribeToSocket(this.props.dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _getActiveMatch = () => getActiveMatch()
    .then(match => setActiveMatch(match))
    .then(this.props.dispatch)
    .catch(e => console.log('No active match set'))

  _getStatus = () => getStatus()
    .then(setStatus)
    .then(i => {
      if (!deepEqual(i.status, this.props.status)) {
        this.props.dispatch(i)
      }
    })

  render () {
    const {
      teamConfiguration: { teamA, teamB },
      status
    } = this.props

    if (!status.clientSpectating || !status.gameOnline) {
      return <GameLoader showMessage status={status} />
    }

    return (
      <div className='overlay'>
        <div className='overlay-left'>
          <Radar />
          <div className='overlay-left-dummy' />
          <Team team={teamA.team} />
        </div>
        <div className='overlay-center'>
          <ScorePlate />
          <div className='overlay-center-dummy' />
          <PlayerPlate />
        </div>
        <div className='overlay-right'>
          <div className='overlay-right-dummy' />
          <Team team={teamB.team} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.common.status,
  teamConfiguration: state.overlay.teamConfiguration
})

export default connect(mapStateToProps)(Main)
