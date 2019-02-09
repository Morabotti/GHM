// @flow
import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'

import type { Status, State } from '../types'
import { ConnectionButton } from './'

type Props = {
  status: Status
}

class TopBar extends Component<Props> {
  render () {
    const { status } = this.props
    return (
      <div className='TopBar'>
        <div className='logo'>
          <div className='logo-cont'>
            <h2>GHM</h2>
          </div>
        </div>
        <div className='currentsite'>
          <div className='btn_nav'>
            <Icon name='list' size='big' />
          </div>
          <div className='crsite'>
            <h2>CS:GO</h2>
          </div>
        </div>
        <div className='dummy' />
        <div className='settings'>
          <ConnectionButton
            clientConnection={status[0]}
            serverConnection={status[1]}
            overlayConnection={false}
          />
          <div className='btn_nav'>
            <Icon name='setting' size='big' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.dashboard.status
})

export default connect(mapStateToProps)(TopBar)
