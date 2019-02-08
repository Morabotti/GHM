// @flow
import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

type Props = {}

class TopBar extends Component<Props> {
  render () {
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
          <div className='btn_nav'>
            <Icon name='setting' size='big' />
          </div>
        </div>
      </div>
    )
  }
}

export default TopBar
