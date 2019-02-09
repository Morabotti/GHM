// @flow
import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader'

import { SideBar, TopBar, CSGOGeneral, Home, Credits } from './'

// $FlowIgnore
import '../index.less'
import 'semantic-ui-css/semantic.min.css'

type Props = {}

class Main extends PureComponent<Props> {

  render () {
    const url = '/dashboard';
    return (
      <BrowserRouter>
        <Fragment>
          <TopBar />
          <SideBar />
          <div className='main-container'>
            <Switch>
              <Route path={url + '/'} exact component={Home}/>
              <Route path={url + '/credits/'} component={Credits}/>
              <Route path={url + '/csgo/general/'} component={CSGOGeneral}/>
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default hot(module)(Main)
