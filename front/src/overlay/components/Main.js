// @flow
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Team, Radar, ScorePlate, PlayerPlate } from './'
import { subscribeToSocket } from '../client'
import type { Dispatch } from '../types'

// $FlowIgnore
import '../index.less'

type Props = {
  dispatch: Dispatch,
}

class Main extends PureComponent<Props> {
  componentDidMount () {
    subscribeToSocket(this.props.dispatch)
  }

  render () {
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
          <Team team='T' />
        </div>
      </div>
    )
  }
}

export default hot(module)(connect()(Main))
