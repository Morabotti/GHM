// @flow
import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import type { Dispatch } from '../types'
import type { State } from '../../types'
import type { Status } from '../../common/types'
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
        <div className={`logo ${show ? '' : 'hidden'}`}>
          <div className='logo-cont'>
            <h2>{show ? 'GHM' : 'G'}</h2>
          </div>
        </div>
        <div
          className={`btn_nav ${show ? 'selected' : ''}`}
          onClick={toggleShow}
        >
          <Icon name='list' size='big' />
        </div>
        <div className='dummy' />
        <div className='settings'>
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
  status: state.common.status
})

export default connect(mapStateToProps)(TopBar)
