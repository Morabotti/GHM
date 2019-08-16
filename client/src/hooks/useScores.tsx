import { useState } from 'react'
import { formats } from '../enum'

interface ScoreContext {
  scoreA: number,
  scoreB: number,
  errorA: boolean,
  errorB: boolean,
  updateScoreA: (e: React.ChangeEvent<HTMLInputElement>) => void,
  updateScoreB: (e: React.ChangeEvent<HTMLInputElement>) => void,
  updateScore: () => void
}

export const useScores = (
  initScoreA: number,
  initScoreB: number,
  initFormat: string
): ScoreContext => {
  const [ format ] = useState(formats.find(e => e.key === initFormat))
  const [ scoreA, setScoreA ] = useState(initScoreA)
  const [ scoreB, setScoreB ] = useState(initScoreB)
  const [ errorA, setErrorA ] = useState(false)
  const [ errorB, setErrorB ] = useState(false)

  const updateScoreA = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)

    if (isNaN(value)) {
      return
    }

    if (format && format.matchesPerTeam < value) {
      setErrorA(true)
    }
    else {
      setErrorA(false)
    }
    setScoreA(value)
  }

  const updateScoreB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)

    if (isNaN(value)) {
      return
    }

    if (format && format.matchesPerTeam < value) {
      setErrorB(true)
    }
    else {
      setErrorB(false)
    }
    setScoreB(value)
  }

  const updateScore = () => {

  }

  return {
    scoreA,
    scoreB,
    errorA,
    errorB,
    updateScoreA,
    updateScoreB,
    updateScore
  }
}
