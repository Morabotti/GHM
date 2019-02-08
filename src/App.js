// @flow
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store'

type Props = {}

const store = configureStore()

class App extends PureComponent<Props> {
  render () {
    return (
      <Provider store={store}>
        <h2>Kappa</h2>
      </Provider>
    )
  }
}

export default hot(module)(App)
