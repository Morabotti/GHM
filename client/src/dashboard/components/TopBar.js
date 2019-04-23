// @flow
import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import type { Status, Dispatch } from '../types'
import type { State } from '../../types'
import { ConnectionButton } from './'

type Props = {
  status: Status,
  show: boolean,
  dispatch: Dispatch,
  toggleShow: void
}

class TopBar extends Component<Props> {
  render () {
    const { status, show, toggleShow } = this.props
    return (
      <div className='top-bar'>
        <div className='logo'>
          <div className='logo-cont'>
            <h2>GHM</h2>
          </div>
        </div>
        <div className='dummy' />
        <div className='settings'>
          <div
            className={`btn_nav ${show ? 'selected' : ''}`}
            onClick={toggleShow}
          >
            <Icon name='list' size='big' />
          </div>
          <ConnectionButton
            clientConnection={status.clientOnline}
            clientSpectating={status.clientSpectating}
            serverConnection={status.gameOnline}
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
