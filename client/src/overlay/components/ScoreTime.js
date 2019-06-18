// @flow
import React from 'react'

type Props = {
  showBomb: boolean,
  useBombEffects: boolean,
  bombState: string,
  bombActive: boolean,
  bombTimeLeft: number,
  phase: string,
  phaseTimer: number,
  round: number
}

const BOMB_TIMER = 40

const sectostr = (time: number) => {
  return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60
}

export default (props: Props) => {
  const {
    showBomb,
    useBombEffects,
    bombState,
    bombActive,
    bombTimeLeft,
    phaseTimer,
    phase,
    round
  } = props

  if (showBomb) {
    return (
      <React.Fragment>
        <div className={`bomb-timer ${useBombEffects ? bombState : ''}`} />
        <div
          className={`bomb-wrapper ${useBombEffects ? bombState : ''}`}
          style={{
            animationDuration: `${
              useBombEffects
                ? 0
                : ((bombActive
                  ? bombTimeLeft
                  : phaseTimer) / BOMB_TIMER) + 0.35}s`
          }}>
          <img src='/static/utils/bomb.svg' className='bomb-icon' />
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className={`time ${(phase === 'live' && phaseTimer <= 10) ? 'text-red' : ''}`}>
        {phase === 'live' || phase === 'freezetime'
          ? sectostr(Math.trunc(phaseTimer) + 1)
          : phase === 'over' ? '0:00' : null
        }
      </div>
      <div className='round'>
        {phase === 'warmup' ? 'WARMUP' : `Round ${round + 1}/30`}
      </div>
    </React.Fragment>
  )
}
