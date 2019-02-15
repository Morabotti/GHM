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
          <Team />
        </div>
        <div className='overlay-center'>
          <h2>Stats, info</h2>
        </div>
        <div className='overlay-right'>
          <Team />
        </div>
      </div>
    )
  }
}

export default hot(module)(Main)
