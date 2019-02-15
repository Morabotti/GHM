// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

import { Player } from './'

type Props = {
  team: 'CT' | 'T'
}

class Team extends PureComponent<Props> {
  render () {
    const { team } = this.props
    return (
      <div className={`team ${team === 'CT' ? 'ct' : 't'}`}>
        <div className='team-info' />
        <Player first />
        <Player />
        <Player />
        <Player />
        <Player last />
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Team)
