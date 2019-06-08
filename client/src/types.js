import type { State as DashboardState } from './dashboard/reducer'
import type { State as OverlayState } from './overlay/reducer'
import type { State as CommonState } from './common/reducer'

export type State = {
  dashboard: DashboardState,
  overlay: OverlayState,
  common: CommonState
}

export type GradeType = {
  range: number,
  text: string,
  output: string,
}

export type Grades = {
  ['bad' | 'poor' | 'fair' | 'good' | 'excellent']: GradeType
}

export type Config = {
  teamNadeGrades: Grades,
  teamEconomyGrades: Grades
}
