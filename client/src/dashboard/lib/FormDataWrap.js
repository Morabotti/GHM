// @flow

type PlayerData = {
  playerFirstName: string,
  playerLastName: string,
  playerName: string,
  playerCountry: string,
  playerTeam: string,
  playerSteam64ID: string,
  playerHasImg: boolean,
  playerImg: any
}

type TeamData = {
  teamShortName: string,
  teamLongName: string,
  teamCountry: string,
  teamHasLogo: boolean,
  teamLogo: any
}

export const TeamSubmit = (team: TeamData) => {
  const {
    teamShortName,
    teamLongName,
    teamCountry,
    teamHasLogo,
    teamLogo
  } = team

  const data = new FormData()
  data.append('teamNameShort', teamShortName)
  data.append('teamNameLong', teamLongName)
  data.append('country', teamCountry === '' ? 'eu': teamCountry)
  data.append('hasLogo', teamHasLogo.toString())

  if(teamHasLogo && teamLogo !== null && teamLogo !== undefined)
    data.append('logo', teamLogo)

  return data
}

export const PlayerSubmit = (player: PlayerData) => {
  const {
    playerFirstName,
    playerLastName,
    playerName,
    playerCountry,
    playerTeam,
    playerSteam64ID,
    playerHasImg,
    playerImg
  } = player

  const data = new FormData()
  data.append('steam64id', playerSteam64ID)
  data.append('firstName', playerFirstName)
  data.append('lastName', playerLastName)
  data.append('gameName', playerName)
  data.append('country', playerCountry === '' ? 'eu' : playerCountry)
  data.append('team', playerTeam)
  data.append('hasImage', playerHasImg.toString())

  if(playerHasImg && playerImg !== null && playerImg !== undefined)
    data.append('image', playerImg)

  return data
}