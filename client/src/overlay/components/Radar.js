// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RadarPlayer, RadarBomb } from './'

import type { State } from '../../types'
import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import type {
  AllPlayers,
  MapState,
  BombState
} from '../types'

import type {
  ConfigState
} from '../../common/types'

type Props = {
  allPlayers: AllPlayers,
  map: MapState,
  bomb: BombState,
  config: ConfigState
}

type ComponentState = {
  prefixX: null|number,
  prefixY: null|number,
  scale: null|number
}

class Radar extends PureComponent<Props, ComponentState> {
  state = {
    prefixX: null,
    prefixY: null,
    scale: null
  }

  componentDidUpdate (prevProp: Props) {
    const { map } = this.props
    if (prevProp.map.name !== map.name) {
      this.setState({
        prefixX: getMapPrefix(map.name)[0],
        prefixY: getMapPrefix(map.name)[1],
        scale: getMapScale(map.name)
      })
    }
  }

  render () {
    const { allPlayers, map, bomb, config } = this.props
    const { prefixX, prefixY, scale } = this.state

    if (!config.useRadar) return <div />
    if (map.name === '') return <div />
    if (scale === null || prefixX === null || prefixY === null) return <div />

    const showBomb = (bomb.state !== 'carried' && bomb.state !== 'planting')

    return (
      <div className='radar'>
        <svg
          viewBox='0 0 1024 1024'
          className='wrap'
          style={{ backgroundImage: `url(/static/map/${map.name}_radar.png)` }}
        >
          {Object.keys(allPlayers).map((key, index) => {
            const player = allPlayers[key]
            return (
              <RadarPlayer
                key={player.observer_slot}
                playerNumber={player.observer_slot}
                playerTeam={player.team}
                playerPosition={player.position}
                playerForward={player.forward}
                playerDead={player.state.health === 0}
                isSpectating={player.watching}
                size={config.playerSize}
                fontSize={config.radarNumberSize}
                prefixX={prefixX}
                prefixY={prefixY}
                scale={scale}
              />
            )
          })}
          {showBomb
            ? <RadarBomb
              position={bomb.position}
              prefixX={prefixX}
              prefixY={prefixY}
              size={config.bombSize}
              scale={scale}
            /> : null
          }
        </svg>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  map: state.overlay.gameStateMap,
  allPlayers: state.overlay.gameStateAllPlayer,
  config: state.common.config,
  bomb: state.overlay.gameStateBomb
})

export default connect(mapStateToProps)(Radar)
