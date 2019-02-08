// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// $FlowIgnore
import './index.less'

const mount = document.getElementById('mount')
const render = () => {
  if (!mount) {
    console.error('No mountpoint found!')
    return
  }

  ReactDOM.render(<App />, mount)
}

render()
