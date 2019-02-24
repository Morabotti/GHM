// @flow
export type Action = { type: 'set-dummy', dummy: String}

export const setDummy = (dummy: String) => ({
  type: 'set-dummy',
  dummy
})
