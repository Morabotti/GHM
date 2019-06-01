// @flow
import config from '../../config'

import type { Nades } from '../types'
import type { GradeType } from '../../types'

export const calculateNadeGrade = (nades: Nades): GradeType => {
  const { bad, poor, fair, good, excellent } = config.teamNadeGrades
  const amount = Object.values(nades).reduce((a, b) => Number(a) + Number(b))

  if (amount <= bad.range) return bad
  if (amount <= poor.range) return poor
  if (amount <= fair.range) return fair
  if (amount <= good.range) return good

  return excellent
}

export const calculateEconomyGrade = (value: number): GradeType => {
  const { bad, poor, fair, good, excellent } = config.teamEconomyGrades

  if (value <= bad.range) return bad
  if (value <= poor.range) return poor
  if (value <= fair.range) return fair
  if (value <= good.range) return good

  return excellent
}
