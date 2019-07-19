import React from 'react'

import { Status } from '../../common/types'

interface Props {
  status: Status,
  showMessage: boolean
}

export default ({ status, showMessage }: Props) => {
  const { clientOnline, gameOnline, clientSpectating } = status
  if (!showMessage) {
    return <div />
  }

  const message = !clientOnline
    ? 'Client not connected'
    : !gameOnline
      ? 'Game not online'
      : !clientSpectating
        ? 'Client is not spectating'
        : ''

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
