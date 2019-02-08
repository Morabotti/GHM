// @flow
import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

type Props = {}

class SideBar extends Component<Props> {
  render () {
    return (
      <div className='SideBar'>
        <div className='collapse'>
          <ul className='Navigation-side'>
            <li className='ConnectionInfo'>
              <p>Connection status</p>
              <span>Connected</span>
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

export default SideBar
