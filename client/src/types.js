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
  events: string
}

export type Config = {
  sockets: SocketEndPoint
}
