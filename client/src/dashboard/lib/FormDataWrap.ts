interface PlayerData {
  playerFirstName: string,
  playerLastName: string,
  playerName: string,
  playerCountry: string,
  playerTeam: string,
  playerSteam64ID: string,
  playerHasImg: boolean,
  playerImg: File | null
}

interface TeamData {
  teamShortName: string,
  teamLongName: string,
  teamCountry: string,
  teamHasLogo: boolean,
  teamLogo: File | null
}

export const TeamSubmit = ({
  teamShortName,
  teamLongName,
  teamCountry,
  teamHasLogo,
  teamLogo
}: TeamData) => {
  const hasLogo = (teamHasLogo && teamLogo !== null && teamLogo !== undefined)

  const data = new FormData()
  data.append('teamNameShort', teamShortName)
  data.append('teamNameLong', teamLongName)
  data.append('country', teamCountry === '' ? 'eu' : teamCountry)
  data.append('hasLogo', hasLogo.toString())

  if (hasLogo && teamLogo) data.append('logo', teamLogo)

  return data
}

export const PlayerSubmit = ({
  playerFirstName,
  playerLastName,
  playerName,
  playerCountry,
  playerTeam,
  playerSteam64ID,
  playerHasImg,
  playerImg
}: PlayerData) => {
  const hasImage = (playerHasImg && playerImg !== null && playerImg !== undefined)

  const data = new FormData()
  data.append('steam64id', playerSteam64ID)
  data.append('firstName', playerFirstName)
  data.append('lastName', playerLastName)
  data.append('gameName', playerName)
  data.append('country', playerCountry === '' ? 'eu' : playerCountry)
  data.append('team', playerTeam)
  data.append('hasImage', hasImage.toString())

  if (hasImage && playerImg) data.append('image', playerImg)

  return data
}
