import 'whatwg-fetch'
import { ConfigState, Status } from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const getStatus = (): Promise<Status> => fetch(
  '/api/game/online',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getConfigs = () => fetch(
  '/api/general/configs',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const updateConfigs = (configs: ConfigState) => fetch(
  '/api/general/configs',
  {
    method: 'POST',
    body: JSON.stringify({ configs: configs }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
