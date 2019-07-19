import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RadarPlayer, RadarBomb } from './'

import { State } from '../../types'
import { getMapPrefix, getMapScale } from '../lib/MapPrefix'

import {
  Map
} from 'csgo-gsi-types'

import {
  AllPlayers,
  Bomb
} from '../types'

import {
  ConfigState
} from '../../common/types'

interface Props {
  allPlayers: AllPlayers | null,
  map: Map | null,
  bomb: Bomb | null,
  config: ConfigState
}

interface ComponentState {
  prefixX: null | number,
  prefixY: null | number,
  scale: null | number
}

class Radar extends PureComponent<Props, ComponentState> {
  constructor (props: Props) {
    super(props)
    this.state = {
      prefixX: null,
      prefixY: null,
      scale: null
    }
  }

  componentDidMount () {
    const { map } = this.props
    if (map !== null && map.name) {
      this.setState({
        prefixX: getMapPrefix(map.name)[0],
        prefixY: getMapPrefix(map.name)[1],
        scale: getMapScale(map.name)
      })
    }
  }

  componentDidUpdate (prevProp: Props) {
    const { map } = this.props
    if (map && prevProp.map && prevProp.map.name !== map.name) {
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

    if (
      !config.useRadar
      || map === null
      || allPlayers === null
      || map.name === ''
    ) {
      return <div />
    }

    if (scale === null || prefixX === null || prefixY === null) return <div />

    const showBomb = (bomb && bomb.state !== 'carried' && bomb.state !== 'planting')

    return (
      <div className='radar'>
        <svg
          viewBox='0 0 1024 1024'
          className='wrap'
          style={{ backgroundImage: `url(/static/map/${map.name}_radar.png)` }}
        >
          {Object.keys(allPlayers).map(key => {
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
          {showBomb && bomb && (
            <RadarBomb
              position={bomb.position}
              prefixX={prefixX}
              prefixY={prefixY}
              size={config.bombSize}
              scale={scale}
            />
          )}
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
