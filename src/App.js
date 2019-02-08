// @flow
import React, { PureComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store'

const DashboardMain = lazy(() => import("./dashboard/components/Main"));
const OverlayMain = lazy(() => import("./overlay/components/Main"));

type Props = {}

const store = configureStore()

class App extends PureComponent<Props> {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Redirect from="/" to="/dashboard" exact />
              <Route path="/dashboard/" component={props => <DashboardMain />} />
              <Route path="/overlay/" component={props => <OverlayMain />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
