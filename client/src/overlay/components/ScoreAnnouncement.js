// @flow
import React from 'react'

type Props = {
  planted: boolean,
  defusing: boolean,
  win: boolean,
  hasKit: boolean,
  eventText: string,
  countdown: number
}

export default (props: Props) => {
  const {
    planted,
    defusing,
    win,
    hasKit,
    eventText,
    countdown
  } = props

  return (
    <div className={`team-event-container
      ${planted ? 'show-bomb' : ''}
      ${defusing ? 'show-defuse' : ''}
      ${win ? ' show-win' : ''}`}
    >
      <div className={`team-event ${defusing ? 'defuse-container' : ''}`}>
        {defusing ? (
          <div className='defuse-progress'>
            <div
              className='progress'
              style={{
                width: `${((hasKit ? 5 : 10) - countdown + 0.05) / (hasKit ? 5 : 10) * 105}%`
              }}
            />
            <span>DEFUSING</span>
          </div>
        ) : (eventText)}
      </div>
    </div>
  )
}
