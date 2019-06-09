// @flow

export type ConfigState = {
  useRadar: boolean,
  playerSize: number,
  bombSize: number
}

export type Status = {
  clientOnline: boolean,
  clientSpectating: boolean,
  gameOnline: boolean,
  gameLive: boolean
}
