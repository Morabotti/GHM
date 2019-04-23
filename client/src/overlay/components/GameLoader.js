// @flow
import React, { PureComponent } from 'react'

import type { Status } from '../../dashboard/types'

type Props = {
  status: Status,
  showMessage: boolean
}

class GameLoader extends PureComponent<Props> {
  render () {
    const { clientOnline, gameOnline, clientSpectating } = this.props.status

    if (!this.props.showMessage) return <div />

    const message = !clientOnline
      ? 'Client not connected'
      : !gameOnline
      ? 'Game not online'
      : !clientSpectating
      ? 'Client is not spectating'
      : 'Error'

    const color = !clientOnline
      ? 'error'
      : !gameOnline
      ? 'warning'
      : !clientSpectating
      ? 'info'
      : ''

    return (
      <div className='loader-message-container'>
        <div>
          <div className={`message-with-icon ${color}`}>
            <div className='loading'>Loading...</div>
            <div className='content'>
              <div className='content-header'>Loading...</div>
              <div className='content-sub'>
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GameLoader
