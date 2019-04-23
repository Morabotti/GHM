// @flow
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import { setStatus } from '../actions'
import { getStatus, subscribeToSocket } from '../client'
import { deepEqual } from '../../dashboard/lib/helpers'
import { PlayerPlate, Radar, ScorePlate, Team, GameLoader } from './'

import type { Dispatch } from '../types'
import type { Status } from '../../dashboard/types'
import type { State } from '../../types'

// $FlowIgnore
import '../index.less'

type Props = {
  dispatch: Dispatch,
  status: Status
}

class Main extends PureComponent<Props> {
  interval: any

  componentDidMount () {
    this._getStatus()
    this.interval = setInterval(this._getStatus, 3000)
    subscribeToSocket(this.props.dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _getStatus = () => getStatus()
    .then(setStatus)
    .then(i => {
      if (!deepEqual(i.status, this.props.status)) {
        this.props.dispatch(i)
      }
    })

  render () {
    const { status } = this.props

    if (!status.clientSpectating)
      return <GameLoader showMessage status={status} />

    return (
      <div className='overlay'>
        <div className='overlay-left'>
          <Radar />
          <div className='overlay-left-dummy' />
          <Team team='CT' />
        </div>
        <div className='overlay-center'>
          <ScorePlate />
          <div className='overlay-center-dummy' />
          <PlayerPlate />
        </div>
        <div className='overlay-right'>
          <div className='overlay-right-dummy' />
          <Team team='T' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.overlay.status
})

export default hot(module)(connect(mapStateToProps)(Main))
