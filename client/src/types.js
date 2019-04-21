import type { State as DashboardState } from './dashboard/reducer'
import type { State as OverlayState } from './overlay/reducer'

export type State = {
  dashboard: DashboardState,
  overlay: OverlayState
}

export type SocketEndPoint = {
  allPlayers: string,
  player: string,
  map: string,
  phase: string,
  events: string,
  nades: string
}

export type GradeType = {
  range: number,
  text: string,
  output: string,
}

export type TeamNadeGrades = {
  ['bad' | 'poor' | 'fair' | 'good' | 'excellent']: GradeType
}

export type Config = {
  sockets: SocketEndPoint,
  teamNadeGrades: TeamNadeGrades
}
