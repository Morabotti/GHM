// @flow
import React, { PureComponent } from 'react'
import type { State } from '../../types'
import { connect } from 'react-redux'

import AUG from '../../static/aug.svg'
import DEAGLE from '../../static/dessu.svg'
import SMOKE from '../../static/smoke.svg'

type Props = {
  first?: boolean,
  last?: boolean
}

class Player extends PureComponent<Props> {
  render () {
    const { first, last } = this.props
    return (
      <div className={`team-player ${first === true ? 'first' : ''}${last === true ? 'last' : ''}`}>
        <div className='player-area-upper'>
          <div className='player-weapon-main'>
            <img src={AUG} className='weapon-wrap' height='25px' />
          </div>
          <div className='player-name'>
            <div className='name'>Morabotti</div><div className='data-divider'>|</div><div className='spec-num'>1</div>
          </div>
          <div className='player-health'>
            100
          </div>
        </div>
        <div className='player-area-lower'>
          <div className='player-weapon-secondary'>
            <div className='player-pistol'>
              <img src={DEAGLE} className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src={SMOKE} className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src={SMOKE} className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src={SMOKE} className='weapon-wrap' height='20px' />
            </div>
            <div className='player-grenade'>
              <img src={SMOKE} className='weapon-wrap' height='20px' />
            </div>
          </div>
          <div className='player-money'>
            <p>$1400</p>
          </div>
          <div className='player-utility'>
            <p>KIT</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({

})

export default connect(mapStateToProps)(Player)
