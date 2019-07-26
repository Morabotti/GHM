import { UpdatePlayer, UpdateTeam } from '../types'

export const newPlayerForm = ({
  steam64ID,
  firstName,
  lastName,
  gameName,
  country,
  team,
  hasImage,
  image
}: UpdatePlayer) => {
  const containsImage = (hasImage && image !== null && image !== undefined)
  const newForm = new FormData()

  newForm.append('steam64ID', steam64ID)
  newForm.append('firstName', firstName)
  newForm.append('lastName', lastName)
  newForm.append('gameName', gameName)
  newForm.append('country', country === '' ? 'eu' : country)
  newForm.append('team', team)
  newForm.append('hasImage', containsImage.toString())

  if (containsImage && image) {
    newForm.append('image', image)
  }

  return newForm
}

export const newTeamForm = ({
  nameShort,
  nameLong,
  country,
  hasLogo,
  logo
}: UpdateTeam) => {
  const containsLogo = (hasLogo && logo !== null && logo !== undefined)
  const newForm = new FormData()

  newForm.append('nameShort', nameShort)
  newForm.append('nameLong', nameLong)
  newForm.append('country', country === '' ? 'eu' : country)
  newForm.append('hasLogo', hasLogo.toString())

  if (containsLogo && logo) {
    newForm.append('logo', logo)
  }

  return newForm
}
