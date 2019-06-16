// @flow

export type ConfigState = {
  useRadar: boolean,
  playerSize: number,
  bombSize: number,
  radarNumberSize: number,
  safeZoneLeft: number,
  safeZoneRight: number,
  safeZoneTop: number,
  safeZoneBottom: number,
  usePreSetName: boolean,
  showTeamLogo: boolean,
  showPlayerNationality: boolean,
  showPlayerPhotoContainerAllways: boolean,
  showPlayerPhotoIfSet: boolean
}

export type Status = {
  clientOnline: boolean,
  clientSpectating: boolean,
  gameOnline: boolean,
  gameLive: boolean
}
