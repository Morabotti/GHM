import React from 'react'

interface Props {
  position: number[],
  prefixX: number,
  prefixY: number,
  scale: number,
  size: number
}

export default (props: Props) => {
  const {
    position,
    prefixY,
    prefixX,
    scale,
    size
  } = props

  const _calculateXPosition = () => {
    if (isNaN(position[0])) return
    return (Math.abs((position[0] - prefixX) / scale) - size / 2)
  }

  const _calculateYPosition = () => {
    if (isNaN(position[1])) return
    return (Math.abs((position[1] - prefixY) / scale) - size / 2)
  }

  return (
    <foreignObject
      x={_calculateXPosition()}
      y={_calculateYPosition()}
      width={size}
      height={size}
    >
      <div className='radar-bomb'>
        B
      </div>
    </foreignObject>
  )
}
