// @flow

export type ConfigState = {
  useRadar: boolean,
  playerSize: number,
  bombSize: number,
  radarNumberSize: number,
  safeZoneLeft: number,
  safeZoneRight: number,
  safeZoneTop: number,
  safeZoneBottom: number
}

export type Status = {
  clientOnline: boolean,
  clientSpectating: boolean,
  gameOnline: boolean,
  gameLive: boolean
}
