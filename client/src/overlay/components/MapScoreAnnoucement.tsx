import React from 'react'

interface Props {
  hide: boolean,
  max: number,
  won: number
}

export default ({
  hide,
  max,
  won
}: Props) => {
  const diff = max - won
  return (
    <div className={`map-score-announcement ${hide ? 'hide' : ''}`}>
      {[...Array(won)].map((_, i) => (
        <div key={i} className='map-score scored' />
      ))}
      {[...Array(diff)].map((_, i) => (
        <div key={i} className='map-score' />
      ))}
    </div>
  )
}
