import { GameState, EVENT, PHASE } from '../types'
import { dispatchSocket, openSockets } from '../models/SocketIo'

const dispatchEvent = (event: EVENT, ...payload: any) => {
  dispatchSocket(
    openSockets.events,
    'state',
    {event, payload}
  )
}

export const analyzeEvents = (state: GameState) => {
  // * MAP EVENTS
  if (state.previously.map !== undefined) {
    const { map } = state.previously
    if (map.name !== undefined) {
      dispatchEvent(EVENT.MAP_CHANGED, {data: state.map.name})
    }
  }

  // * PHASE EVENTS
  if (state.previously.phase_countdowns !== undefined) {
    const { phase_countdowns } = state.previously
    if (phase_countdowns.phase !== undefined) {
      switch(phase_countdowns.phase) {
        case PHASE.FREEZETIME:
          dispatchEvent(EVENT.FREEZETIME_END)
          break
        case PHASE.OVER:
          if(state.phase_countdowns.phase === PHASE.FREEZETIME)
            dispatchEvent(EVENT.FREEZETIME_START)
          break
      }
    }
  }
}