// @flow
import React, { PureComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store'

// $FlowIgnore
import './loader.less'

const DashboardMain = lazy(() => import('./dashboard/components/Main'))
const OverlayMain = lazy(() => import('./overlay/components/Main'))
const PopUpMain = lazy(() => import('./popup/components/Main'))

type Props = {}

const store = configureStore()

class App extends PureComponent<Props> {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<div className='center'><div className='loader' /></div>}>
            <Switch>
              <Redirect from='/' to='/dashboard' exact />
              <Route path='/dashboard/' component={props => <DashboardMain />} />
              <Route path='/overlay/' component={props => <OverlayMain />} />
              <Route path='/popup/' component={props => <PopUpMain />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
