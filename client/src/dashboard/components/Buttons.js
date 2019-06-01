// @flow
import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import type {
  BigConnectionButtonType,
  ConnectionButtonType
} from '../types'

export const ClientConnectButton = (props: BigConnectionButtonType) => (
  <span className={`status ${props.connected ? 'connected' : 'disconnected'}`}>
    {props.connected ? 'Connected' : 'Not Connected'}
  </span>
)

export const ServerConnectButton = (props: BigConnectionButtonType) => (
  <span className={`status ${props.connected ? 'connected' : 'warning'}`}>
    {props.connected ? 'Server connected' : 'Server not connected'}
  </span>
)

const StatusBtn = (props: any) => (
  <span className={`status-tag ${
    props.disconnected
      ? 'connected'
      : 'disconnected'}`}
  >{props.disconnected ? 'Online' : 'Offline'}</span>
)

export const ConnectionButton = (props: ConnectionButtonType) => {
  const {
    clientConnection,
    serverConnection,
    overlayConnection,
    clientSpectating
  } = props

  const cornerIcon = !clientConnection
    ? <Icon corner name='close' color='orange' />
    : !serverConnection
      ? <Icon corner name='check circle' color='yellow' />
      : <Icon corner name='check circle' color='green' />

  const BtnIcon = (
    <Icon.Group size='big'>
      <Icon name='wifi' />
      {cornerIcon}
    </Icon.Group>
  )

  return (
    <div className='btn_nav'>
      <Popup
        flowing hoverable
        trigger={BtnIcon}
        position='bottom right'
      >
        <div className='pop-up-cont'>
          <p>CSGO client status: <StatusBtn disconnected={clientConnection} /></p>
          <p>CSGO server status: <StatusBtn disconnected={serverConnection} /></p>
          <p>Client spectating status: <StatusBtn disconnected={clientSpectating} /></p>
          <p>Overlay status: <StatusBtn disconnected={overlayConnection} /></p>
        </div>
      </Popup>
    </div>
  )
}
