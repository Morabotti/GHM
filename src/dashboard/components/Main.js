// @flow
import React, { PureComponent, Fragment } from 'react'
import { hot } from 'react-hot-loader'

import { SideBar, TopBar, MainContainer } from './'

// $FlowIgnore
import '../index.less'
import 'semantic-ui-css/semantic.min.css'

type Props = {}

class Main extends PureComponent<Props> {
  render () {
    return (
      <Fragment>
        <TopBar />
        <SideBar />
        <MainContainer />
      </Fragment>
    )
  }
}

export default hot(module)(Main)
