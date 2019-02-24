// @flow
import type { Action as _Action } from './actions'

export type Status = Array<boolean>

export type Action = _Action

export type Dispatch = (Action) => void

export type BigConnectionButtonType = {
  connected: boolean
}

export type ConnectionButtonType = {
  clientConnection: boolean,
  serverConnection: boolean,
  overlayConnection: boolean
}

export type HeaderSizes = ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8')
