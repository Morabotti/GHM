import React from 'react'

interface Props {
  defusing: boolean,
  hasKit: boolean,
  countdown: number
}

export default ({
  defusing,
  hasKit,
  countdown
}: Props) => (
  <div className={`team-event-container ${defusing ? 'show-defuse' : ''}`}>
    <div className='team-event defuse-container'>
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
      ) : null}
    </div>
  </div>
)
