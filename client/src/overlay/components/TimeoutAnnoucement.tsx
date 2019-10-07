import React from 'react'

interface Props {
  timeout: boolean,
  eventText: string
}

export default ({
  timeout,
  eventText
}: Props) => (
  <div className={`team-event-container ${timeout ? 'show-timeout' : ''}`}>
    <div className='team-event'>
      {eventText}
    </div>
  </div>
)
