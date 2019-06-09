// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setActiveMatch } from '../actions'
import { setStatus, setConfig } from '../../common/actions'
import { getStatus, getConfigs } from '../../common/client'
import { getActiveMatch, subscribeToSocket } from '../client'
import { deepEqual } from '../../dashboard/lib/helpers'
import { PlayerPlate, Radar, ScorePlate, Team, GameLoader } from './'

import type { Dispatch, StateTeamConfig } from '../types'
import type { Status } from '../../dashboard/types'
import type { State } from '../../types'
import type { ConfigState } from '../../common/types'

// $FlowIgnore
import '../index.less'

type Props = {
  dispatch: Dispatch,
  status: Status,
  teamConfiguration: StateTeamConfig,
  config: ConfigState
}

class Main extends PureComponent<Props> {
  interval: window.TimerHandler

  componentDidMount () {
    this._getStatus()
    this._getActiveMatch()
    this._fetchSettings()
    this.interval = setInterval(this._getStatus, 3000)
    subscribeToSocket(this.props.dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _fetchSettings = () => getConfigs()
    .then(setConfig)
    .then(this.props.dispatch)

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
      status,
      config
    } = this.props

    if (!status.clientSpectating || !status.gameOnline) {
      return <GameLoader showMessage status={status} />
    }

    return (
      <div
        className='overlay'
        style={{
          marginLeft: `${config.safeZoneRight}px`,
          marginRight: `${config.safeZoneLeft}px`
        }}
      >
        <div
          className='overlay-left'
          style={{
            marginBottom: `${config.safeZoneBottom}px`,
            marginTop: `${config.safeZoneTop}px`
          }}
        >
          <Radar />
          <div className='overlay-left-dummy' />
          <Team team={teamA.team} />
        </div>
        <div
          className='overlay-center'
          style={{
            marginTop: `${config.safeZoneTop}px`
          }}
        >
          <ScorePlate />
          <div className='overlay-center-dummy' />
          <PlayerPlate />
        </div>
        <div
          className='overlay-right'
          style={{
            marginBottom: `${config.safeZoneBottom}px`,
            marginTop: `${config.safeZoneTop}px`
          }}
        >
          <div className='overlay-right-dummy' />
          <Team team={teamB.team} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.common.status,
  teamConfiguration: state.overlay.teamConfiguration,
  config: state.common.config
})

export default connect(mapStateToProps)(Main)
