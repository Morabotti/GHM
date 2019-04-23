// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

import { ClientConnectButton, ServerConnectButton } from './'
import { deepEqual } from '../lib/helpers'

import { getStatus } from '../client'
import { setStatus } from '../actions'

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
      if (!deepEqual(i.status, this.props.status))
        this.props.dispatch(i)
    })

  render () {
    const url = '/dashboard'
    const { status, show } = this.props

    return (
      <div className={`side-bar ${show ? '' : 'hidden'}`}>
        <div className='collapse'>
          <ul className='navigation-side'>
            <li className='connection-info'>
              <p>Connection status</p>
              <ClientConnectButton connected={status.clientOnline} />
              <ServerConnectButton connected={status.gameOnline} />
            </li>
            <li className='list-cont'>
              <NavLink className='item-link' activeClassName='chosen' exact to={url + '/'}>
                <span className='item-name-header'> <Icon color='green' name='home' /> Home</span>
              </NavLink>
            </li>
            <li className='connection-info'>
              <p>Game</p>
            </li>
            <li className='list-cont'>
              <NavLink className='item-link' activeClassName='chosen' exact to={url + '/live'}>
                <span className='item-name-header'> <Icon color='green' name='fire' /> Live</span>
              </NavLink>
            </li>
            <li className='list-cont'>
              <NavLink className='item-link' activeClassName='chosen' to={url + '/overlay'}>
                <span className='item-name-header'> <Icon color='green' name='book' /> Overlay</span>
              </NavLink>
            </li>
            <li className='list-cont'>
              <NavLink className='item-link' activeClassName='chosen' to={url + '/config'}>
                <span className='item-name-header'> <Icon color='green' name='info circle' /> Config</span>
              </NavLink>
            </li>
            <li className='list-cont'>
              <NavLink className='item-link' activeClassName='chosen' to={url + '/options'}>
                <span className='item-name-header'> <Icon color='green' name='calendar alternate' /> Options</span>
              </NavLink>
            </li>
          </ul>
          <div className='owner-panel'>
            <ul className='navigation-side'>
              <li className='connection-info'>
                <p>Dashboard</p>
              </li>
              <li className='list-cont'>
                <NavLink className='item-link' activeClassName='chosen' to={url + '/settings'}>
                  <span className='item-name-header'> <Icon color='green' name='user' /> Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.dashboard.status
})

export default withRouter(connect(mapStateToProps)(SideBar))
