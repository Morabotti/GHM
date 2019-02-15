// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'

import { ClientConnectButton, ServerConnectButton } from './'

import { getStatus } from '../client'
import { setStatus } from '../actions'

import type { Status, Dispatch } from '../types'
import type { State } from '../../types'

type Props = {
  dispatch: Dispatch,
  status: Status,
  show: boolean,
}

class SideBar extends Component<Props> {
  interval: IntervalID

  componentDidMount () {
    this._getStatus()
    this.interval = setInterval(this._getStatus, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _getStatus = () => getStatus()
    .then(setStatus)
    .then(i => {
      if (i.status[0] !== this.props.status[0] || i.status[1] !== this.props.status[1]) {
        this.props.dispatch(i)
      }
    })

  render () {
    const url = '/dashboard'
    const { status, show } = this.props

    return (
      <div className={show ? 'SideBar' : 'SideBar hidden'}>
        <div className='collapse'>
          <ul className='Navigation-side'>
            <li className='ConnectionInfo'>
              <p>Connection status</p>
              <ClientConnectButton connected={status[0]} />
              <ServerConnectButton connected={status[1]} />
            </li>
            <li className='list-cont'>
              <NavLink className='Item-major-link' activeClassName='chosen' exact to={url + '/'}>
                <span className='Item-name-header'> <Icon color='green' name='home' /> Home</span>
              </NavLink>
            </li>
            <li className='list-cont'>
              <NavLink className='Item-major-link' activeClassName='chosen' to={url + '/credits'}>
                <span className='Item-name-header'> <Icon color='green' name='question circle outline' /> Credits</span>
              </NavLink>
            </li>
            <li className='list-cont selected-header'>
              <Link to={url + '/csgo/general/'}>
                <span className='Item-name-header'> <Icon color='green' name='th' /> CSGO</span>
              </Link>
            </li>
            <li className='list-cont'>
              <NavLink className='link-normal is-sublink' activeClassName='chosen' to={url + '/csgo/general/'}>
                <span className='Item-name'>General</span>
              </NavLink>
            </li>
            <li className='list-cont'>
              <NavLink className='link-normal is-sublink' activeClassName='chosen' to={url + '/csgo/schedule/'}>
                <span className='Item-name'>Schedule</span>
              </NavLink>
            </li>
            <li className='list-cont is-sublink'>
              <NavLink className='link-normal' activeClassName='chosen' to={url + '/csgo/statistics/'}>
                <span className='Item-name'>Statistics</span>
              </NavLink>
            </li>
            <li className='list-cont is-sublink'>
              <NavLink className='link-normal' activeClassName='chosen' to={url + '/csgo/settings/'}>
                <span className='Item-name'>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  status: state.dashboard.status
})

export default withRouter(connect(mapStateToProps)(SideBar))
