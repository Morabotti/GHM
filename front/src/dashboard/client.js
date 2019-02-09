// @flow
import 'whatwg-fetch'

const checkResponse = (res: window.Response): window.Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }

  return res
}

export const getStatus = () => window.fetch(
  '/api/csgsi/isonline',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
