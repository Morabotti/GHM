// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'
import { RadarPlayer } from './'

type Props = {}

class Radar extends PureComponent<Props> {
  render () {
    return (
      <div className='radar'>
        <div className='radar-wrap' >
          <RadarPlayer
            PlayerNumber={1}
            PlayerTeam={'CT'}
            PlayerPosX={0}
            PlayerPosY={0}
          />
          <RadarPlayer
            PlayerNumber={2}
            PlayerTeam={'T'}
            PlayerPosX={-2093}
            PlayerPosY={3117}
          />
          <RadarPlayer
            PlayerNumber={3}
            PlayerTeam={'CT'}
            PlayerPosX={-2203}
            PlayerPosY={-1031}
          />
          <RadarPlayer
            PlayerNumber={4}
            PlayerTeam={'T'}
            PlayerPosX={1561}
            PlayerPosY={3059}
          />
          <RadarPlayer
            PlayerNumber={5}
            PlayerTeam={'CT'}
            PlayerPosX={439}
            PlayerPosY={-1000}
          />
          <RadarPlayer
            PlayerNumber={6}
            PlayerTeam={'CT'}
            PlayerPosX={1769}
            PlayerPosY={310}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Radar)
