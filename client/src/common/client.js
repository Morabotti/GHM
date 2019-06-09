// @flow
import 'whatwg-fetch'
import type { ConfigState } from './types'

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getStatus = () => window.fetch(
  '/api/game/online',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getConfigs = () => window.fetch(
  '/api/general/configs',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const updateConfigs = (configs: ConfigState) => window.fetch(
  '/api/general/configs',
  {
    method: 'POST',
    body: JSON.stringify({ configs: configs }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
