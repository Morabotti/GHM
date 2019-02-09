// @flow
import React, { Component } from 'react'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import { getStatus } from '../client'
import { setStatus } from '../actions'

import type { Status, State } from '../types'

type Props = {
  dispatch: Dispatch,
  status: Status
}

class SideBar extends Component<Props> {
  interval: IntervalID

  componentDidMount () {
    this._getStatus()
    this.interval = setInterval(this._getStatus, 2500)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _getStatus = () => getStatus()
    .then(setStatus)
    .then(this.props.dispatch)

  render () {
    const { status } = this.props
    let connectionButton, serverButton

    if (status[0]) connectionButton = <span className='status connected'>Connected</span>
    else connectionButton = <span className='status disconnected'>Not Connected</span>

    if (status[1]) serverButton = <span className='status connected'>Server connected</span>
    else serverButton = <span className='status warning'>Server not connected</span>

    return (
      <div className='SideBar'>
        <div className='collapse'>
          <ul className='Navigation-side'>
            <li className='ConnectionInfo'>
              <p>Connection status</p>
              {connectionButton}
              {serverButton}
            </li>
            <li className='selected-header'>
              <button className='link-header'>
                <Icon color='green' name='th' />
                <span className='Item-name-header'>CS:GO</span>
              </button>
            </li>
            <li className='selected'>
              <button className='link-normal'>
                <span className='Item-name'>General</span>
              </button>
            </li>
            <li className='selected'>
              <button className='link-normal'>
                <span className='Item-name'>Schedule</span>
              </button>
            </li>
            <li className='selected'>
              <button className='link-normal'>
                <span className='Item-name'>Statistics</span>
              </button>
            </li>
            <li className='selected'>
              <button className='link-normal'>
                <span className='Item-name'>Settings</span>
              </button>
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

export default connect(mapStateToProps)(SideBar)
