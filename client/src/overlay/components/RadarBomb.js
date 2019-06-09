// @flow
import React from 'react'

type Props = {
  position: Array<number>,
  prefixX: number,
  prefixY: number,
  scale: number
}

const BOMB_SIZE = 40

export default (props: Props) => {
  const _calculateXPosition = () => {
    const { position, prefixX, scale } = props

    if (isNaN(position[0])) return
    return (Math.abs((position[0] - prefixX) / scale) - BOMB_SIZE / 2)
  }

  const _calculateYPosition = () => {
    const { position, prefixY, scale } = props

    if (isNaN(position[1])) return
    return (Math.abs((position[1] - prefixY) / scale) - BOMB_SIZE / 2)
  }

  return (
    <foreignObject
      x={_calculateXPosition()}
      y={_calculateYPosition()}
      width={BOMB_SIZE}
      height={BOMB_SIZE}
    >
      <div className='radar-bomb'>
        B
      </div>
    </foreignObject>
  )
}
