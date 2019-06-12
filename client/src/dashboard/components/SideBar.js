// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { ClientConnectButton, ServerConnectButton, SideBarItem } from './'
import { deepEqual } from '../lib/helpers'

import { getStatus } from '../../common/client'
import { setStatus } from '../../common/actions'

import type { Status, Dispatch } from '../types'
import type { State } from '../../types'

type Props = {
  dispatch: Dispatch,
  status: Status,
  show: boolean
}

class SideBar extends Component<Props> {
  interval: any

  componentDidMount () {
    this._getStatus()
    this.interval = setInterval(this._getStatus, 3000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _getStatus = () => getStatus()
    .then(setStatus)
    .then(i => {
      if (!deepEqual(i.status, this.props.status)) {
        this.props.dispatch(i)
      }
    })

  render () {
    const { status, show } = this.props

    return (
      <div className={`drawer ${show ? '' : 'hidden'}`}>
        <div className='drawer-container'>
          <div className='current-status'>
            <p>Connection status</p>
            <ClientConnectButton
              connected={status.clientOnline}
              isFullWidth={show}
            />
            <ServerConnectButton
              connected={status.gameOnline}
              isFullWidth={show}
            />
          </div>
          <hr className='drawer-divider' />
          <ul className='drawer-list'>
            <SideBarItem to='/' icon='home' text='Home' />
            <SideBarItem to='/settings' icon='cog' text='Settings' />
          </ul>
          <hr className='drawer-divider' />
          <ul className='drawer-list'>
            <SideBarItem to='/live' icon='fire' text='Live' />
            <SideBarItem to='/overlay' icon='globe' text='Overlay' />
            <SideBarItem to='/config' icon='configure' text='Config' />
          </ul>
          <hr className='drawer-divider' />
          <ul className='drawer-list'>
            <SideBarItem to='/teams' icon='users' text='Teams' />
            <SideBarItem to='/players' icon='user' text='Players' />
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.common.status
})

export default withRouter(connect(mapStateToProps)(SideBar))
