import { State as DashboardState } from './dashboard/reducer'
import { State as OverlayState } from './overlay/reducer'
import { State as CommonState } from './common/reducer'

export interface State {
  dashboard: DashboardState,
  overlay: OverlayState,
  common: CommonState
}

export interface GradeType {
  range: number,
  text: string,
  output: string
}

export type Grades = {
  [key in GradeTypes]: GradeType;
}

export type GradeTypes = 'bad' | 'poor' | 'fair' | 'good' | 'excellent'

export interface Config {
  socketUrl: string,
  teamNadeGrades: Grades,
  teamEconomyGrades: Grades
}
