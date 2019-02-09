// @flow
import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

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

export const ConnectionButton = props => {
  const { clientConnection, serverConnection, overlayConnection } = props
  let cornerIcon, CSGOonlineTag, SERVERonlineTag, OVERLAYonlineTag;

  if( clientConnection === false) cornerIcon = <Icon corner name='close' color='orange'/>
  else if( serverConnection === false ) cornerIcon = <Icon corner name='check circle' color='yellow'/>
  else cornerIcon = <Icon corner name='check circle' color='green'/>

  const BtnIcon = (
    <Icon.Group size='big'> 
      <Icon name='wifi' /> 
      {cornerIcon} 
    </Icon.Group>
  )

  if( clientConnection ) CSGOonlineTag = <span className='statusTag connected'>Online</span>
  else CSGOonlineTag = <span className='statusTag disconnected'>Offline</span>

  if( serverConnection ) SERVERonlineTag = <span className='statusTag connected'>Online</span>
  else SERVERonlineTag = <span className='statusTag warning'>Offline</span>

  if( overlayConnection ) OVERLAYonlineTag = <span className='statusTag connected'>Online</span>
  else OVERLAYonlineTag = <span className='statusTag disconnected'>Offline</span>

  return (
    <div className='btn_nav'>
      <Popup
        flowing hoverable
        trigger={BtnIcon}
        position='bottom right'
      >
        <div className="popUpCont">
          <p>CSGO client status: {CSGOonlineTag}</p>
          <p>CSGO server status: {SERVERonlineTag}</p>
          <p>Stream overlay status: {OVERLAYonlineTag}</p>
        </div>
      </Popup>
    </div>
  )
}