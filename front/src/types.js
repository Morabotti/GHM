import type { State as DashboardState } from './dashboard/reducer'
import type { State as OverlayState } from './overlay/reducer'

export type State = {
  dashboard: DashboardState,
  overlay: OverlayState
}
