// @flow
import type { State as _State } from './reducer'
import type { Action as _Action } from './actions'

export type State = _State

export type Status = Array<boolean>

export type Action = _Action

export type Dispatch = (Action) => void
