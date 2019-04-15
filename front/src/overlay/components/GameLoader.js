// @flow
import React, { PureComponent } from 'react'

import type { Status } from '../../dashboard/types'

type Props = {
  status: Status
}

class GameLoader extends PureComponent<Props> {
  render () {
    // TODO: Add CSS, animation, spinner?
    const { clientOnline, gameOnline, clientSpectating } = this.props.status

    if (!clientOnline) return (
      <div>
        <h2>Loading, Client not connected</h2>
      </div>
    )

    if (!gameOnline) return (
      <div>
        <h2>Loading, Game not online</h2>
      </div>
    )

    if(!clientSpectating) return (
      <div>
        <h2>Loading, Client is not spectating</h2>
      </div>
    )

    return (
      <div>
        <h2>Random loading?</h2>
      </div>
    )
  }
}

export default GameLoader
