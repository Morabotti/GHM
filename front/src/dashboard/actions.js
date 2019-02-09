// @flow
import { Status } from './types'
export type Action = { type: 'set-status', status: Status }

export const setStatus = (status: Status) => ({
  type: 'set-status',
  status
})
