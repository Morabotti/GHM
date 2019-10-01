import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'

import {
  Map
} from 'csgo-gsi-types'

import {
  PlayerPlate,
  Radar,
  ScorePlate,
  Team,
  GameLoader
} from './'

import { setActiveMatch } from '../actions'
import { Dispatch, StateTeamConfig } from '../types'
import { getActiveMatch, subscribeToSocket } from '../client'

import { deepEqual } from '../../dashboard/lib/helpers'
import { State } from '../../types'

import { setStatus, setConfig } from '../../common/actions'
import { getStatus, getConfigs, updateConfigs } from '../../common/client'
import { ConfigState, Status } from '../../common/types'

import '../index.less'

interface Props {
  dispatch: Dispatch,
  status: Status,
  teamConfiguration: StateTeamConfig,
  config: ConfigState,
  mapData: Map | null,
  location: { search: string }
}

interface ComponentState {
  hideScore: boolean,
  hideTeams: boolean
}

class Main extends PureComponent<Props, ComponentState> {
  private interval: NodeJS.Timeout | undefined

  constructor (props: Props) {
    super(props)

    this.state = {
      hideScore: props.location.search.includes('hideScore'),
      hideTeams: props.location.search.includes('hideTeams')
    }
  }

  componentDidMount () {
    this._getStatus()
    this._getActiveMatch()
    this._fetchSettings()
    this.interval = setInterval(this._getStatus, 3000)
    subscribeToSocket(this.props.dispatch)
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  _fetchSettings = () => getConfigs()
    .then(setConfig)
    .then(this.props.dispatch)
    .catch(() => {
      console.log('Config fetch failed. Creating config.json')
      updateConfigs(this.props.config)
    })

  _getActiveMatch = () => getActiveMatch()
    .then(match => setActiveMatch(match))
    .then(this.props.dispatch)
    .catch(() => console.log('No active match set'))

  _getStatus = () => getStatus()
    .then(status => {
      if (!deepEqual(status, this.props.status)) {
        this.props.dispatch(setStatus(status))
      }
    })

  render () {
    const {
      teamConfiguration: { teamA, teamB },
      status,
      config,
      mapData
    } = this.props

    const {
      hideTeams,
      hideScore
    } = this.state

    if (!status.clientSpectating || !status.gameOnline || !mapData) {
      return <GameLoader
        showMessage={!config.disableOverlayIndicator}
        dense={config.useDenseOverlayIndicator}
        status={status}
      />
    }

    if (mapData.phase === 'gameover') return <React.Fragment />

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
          {!hideTeams && (
            <Team team={teamA.team} />
          )}
        </div>
        <div
          className='overlay-center'
          style={{
            marginTop: `${config.safeZoneTop}px`
          }}
        >
          {!hideScore
            ? <ScorePlate />
            : <div className='overlay-top-dummy' />
          }
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
          {!hideTeams && (
            <Team team={teamB.team} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.common.status,
  teamConfiguration: state.overlay.teamConfiguration,
  config: state.common.config,
  mapData: state.overlay.gameStateMap
})

export default compose<Props, {}>(
  withRouter,
  connect(mapStateToProps)
)(Main)
