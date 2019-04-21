// @flow
import config from '../../config'

import type { TeamStats } from '../types'
import type { GradeType } from '../../types'

export const calculateNadeGrade = (nades: TeamStats): GradeType  => {
  const { bad, poor, fair, good, excellent } = config.teamNadeGrades
  const amount = Object.values(nades).reduce((a, b) => Number(a) + Number(b))
  if (amount <= bad.range) {
    return bad
  }
  if (amount <= poor.range) {
    return poor
  }
  if (amount <= fair.range) {
    return fair
  }
  if (amount <= good.range) {
    return good
  }
  if (amount <= excellent.range) {
    return excellent
  }
}