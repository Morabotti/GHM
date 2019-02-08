// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader';

import App from './App'

const mount = document.getElementById('mount')
const render = () => {
  if (!mount) {
    console.error('No mountpoint found!')
    return
  }

  ReactDOM.render(<AppContainer><App /></AppContainer>, mount)
}

render()

// $FlowIgnore
if (module.hot) {
  // $FlowIgnore
  module.hot.accept('./App', render)
}
