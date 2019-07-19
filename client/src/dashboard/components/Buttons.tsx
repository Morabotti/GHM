import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

interface StatusType {
  disconnected: boolean
}

interface ConnectionButtonType {
  clientConnection: boolean,
  clientSpectating: boolean,
  serverConnection: boolean,
  overlayConnection: boolean
}

interface BigConnectionButtonType {
  connected: boolean,
  isFullWidth: boolean
}

export const ClientConnectButton = ({
  connected,
  isFullWidth
}: BigConnectionButtonType) => (
  <span className={`status ${connected ? 'connected' : 'disconnected'}`}>
    {isFullWidth
      ? connected
        ? 'Connected'
        : 'Not Connected'
      : connected
        ? 'C'
        : 'N'
    }
  </span>
)

export const ServerConnectButton = ({
  connected,
  isFullWidth
}: BigConnectionButtonType) => (
  <span className={`status ${connected ? 'connected' : 'warning'}`}>
    {isFullWidth
      ? connected
        ? 'Server Connected'
        : 'Server Not Connected'
      : connected
        ? 'C'
        : 'N'
    }
  </span>
)

const StatusBtn = ({ disconnected }: StatusType) => (
  <span className={`status-tag ${
    disconnected
      ? 'connected'
      : 'disconnected'}`}
  >{disconnected ? 'Online' : 'Offline'}</span>
)

export const ConnectionButton = ({
  clientConnection,
  serverConnection,
  overlayConnection,
  clientSpectating
}: ConnectionButtonType) => {
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
        flowing
        hoverable
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
