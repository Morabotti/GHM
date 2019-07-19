import React, { PureComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store'

import './loader.less'

const DashboardMain = lazy(() => import('./dashboard/components/Main'))
const OverlayMain = lazy(() => import('./overlay/components/Main'))

const store = configureStore()

class App extends PureComponent<{}> {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<div className='center'><div className='custom-loader' /></div>}>
            <Switch>
              <Redirect from='/' to='/dashboard' exact />
              <Route path='/dashboard/' component={() => <DashboardMain />} />
              <Route path='/overlay/' component={() => <OverlayMain />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
