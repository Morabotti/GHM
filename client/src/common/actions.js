// @flow
import type { ConfigState, Status } from './types'

export type Action = { type: 'set-config', config: ConfigState }
  | { type: 'set-status', status: Status }

export const setConfig = (config: ConfigState) => ({
  type: 'set-config',
  config
})

export const setStatus = (status: Status) => ({
  type: 'set-status',
  status
})
