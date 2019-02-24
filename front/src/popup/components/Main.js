// @flow
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'

// $FlowIgnore
import '../index.less'

type Props = {}

class Main extends PureComponent<Props> {
  render () {
    return (
      <div>
        <h2>Keepo</h2>
      </div>
    )
  }
}

export default hot(module)(Main)
