// @flow
import React from 'react'

export const ClientConnectButton = props => {
  const { connected } = props
  if ( connected ) return ( <span className='status connected'>Connected</span> )
  else return ( <span className='status disconnected'>Not Connected</span> )
}

export const ServerConnectButton = props => {
  const { connected } = props
  if ( connected ) return ( <span className='status connected'>Server connected</span> )
  else return ( <span className='status warning'>Server not connected</span> )
}
