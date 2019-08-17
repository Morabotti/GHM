import React from 'react'

interface Props {
  planted: boolean,
  win: boolean,
  eventText: string
}

export default ({
  planted,
  win,
  eventText
}: Props) => (
  <div className={`team-event-container
    ${planted ? 'show-bomb' : ''}
    ${win ? ' show-win' : ''}`}
  >
    <div className='team-event'>
      {eventText}
    </div>
  </div>
)
