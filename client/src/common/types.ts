export interface ConfigState {
  useRoundedCorners: boolean,
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

export interface Status {
  clientOnline: boolean,
  clientSpectating: boolean,
  gameOnline: boolean,
  gameLive: boolean
}
