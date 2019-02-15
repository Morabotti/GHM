// @flow
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { Team } from './'

// $FlowIgnore
import '../index.less'

type Props = {}

class Main extends PureComponent<Props> {
  render () {
    return (
      <div className='overlay'>
        <div className='overlay-left'>
          <Team team='CT' />
        </div>
        <div className='overlay-center' />
        <div className='overlay-right'>
          <Team team='T' />
        </div>
      </div>
    )
  }
}

export default hot(module)(Main)
