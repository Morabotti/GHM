// @flow
import { Status } from './types'

export type Action = { type: 'set-status', status: Status }
  | { type: 'toggle-navbar', showNavbar: boolean }

export const setStatus = (status: Status) => ({
  type: 'set-status',
  status
})

export const toggleNavBar = (showNavbar: boolean) => ({
  type: 'toggle-navbar',
  showNavbar
})
