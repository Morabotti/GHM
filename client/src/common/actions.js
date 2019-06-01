// @flow
import type { ConfigState } from './types'

export type Action = { type: 'set-config', config: ConfigState }

export const setConfig = (config: ConfigState) => ({
  type: 'set-config',
  config
})
