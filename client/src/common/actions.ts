import { ConfigState, Status } from './types'

export type Action = { type: 'set-config', config: ConfigState }
| { type: 'set-status', status: Status }

export const setConfig = (config: ConfigState): Action => ({
  type: 'set-config',
  config
})

export const setStatus = (status: Status): Action => ({
  type: 'set-status',
  status
})
