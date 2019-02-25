// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'
import { RadarPlayer } from './'
import openSocket from 'socket.io-client'

const socketEndPoint = 'http://localhost:8081/socket-overlay'

type Props = {}

class Radar extends PureComponent<Props> {
  constructor () {
    super()
    this.state = {
      allplayers: []
    }
  }

  componentDidMount () {
    const socket = openSocket(socketEndPoint)
    socket.on('state', data => {
      this.setState({ allplayers: data })
    })
  }

  render () {
    return (
      <div className='radar'>
        <div className='radar-wrap' >
          {this.state.allplayers.map((player, index) => {
            const playerX = Number(player.position.substring(0, player.position.indexOf(',')))
            const playerY = (player.position.substring(player.position.indexOf(',') + 1, player.position.indexOf(',', player.position.indexOf(',') + 1)))
            return (
              <RadarPlayer
                key={index}
                PlayerNumber={player.observer_slot}
                PlayerTeam={player.team}
                PlayerPosX={playerX}
                PlayerPosY={playerY}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Radar)
