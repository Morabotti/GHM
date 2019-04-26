// @flow
import type { Action as _Action } from './actions'

export type Status = {
  clientOnline: boolean,
  clientSpectating: boolean,
  gameOnline: boolean,
  gameLive: boolean
}

export type Action = _Action

export type Dispatch = (Action) => void

export type BigConnectionButtonType = {
  connected: boolean
}

export type ConnectionButtonType = {
  clientConnection: boolean,
  clientSpectating: boolean,
  serverConnection: boolean,
  overlayConnection: boolean
}

export type Country = {
  key: string,
  value: string,
  flag: string,
  text: string
}

export type ListElement = {
  key: string,
  value: string,
  text: string,
  image: { avatar: boolean, src: string }
}

export type Team = {
  hasLogo: boolean,
  _id: string,
  teamNameShort: string,
  teamNameLong: string,
  country: string,
  logoPath: string
}

export type Player = {
  hasImage: boolean,
  _id: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  steam64id: string,
  team: string,
  imagePath: string,
}

export type Players = Array<Player>

export type Teams = Array<Team>

export type Countries = {
  countries: Array<Country>
}

export type HeaderSizes = ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8')
