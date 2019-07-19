import { Action as _Action } from './actions'
import { Action as CommonAction } from '../common/actions'
import { FlagNameValues } from 'semantic-ui-react'

export type Action = _Action

export type Dispatch = (action: Action | CommonAction) => void

export interface Match {
  _id?: string,
  teamA: string,
  teamB: string,
  isLive: boolean
}

export interface ConnectionButtonType {
  clientConnection: boolean,
  clientSpectating: boolean,
  serverConnection: boolean,
  overlayConnection: boolean
}

export interface Country {
  key: string,
  value: string,
  flag: string,
  text: string
}

export interface ListElement {
  key: string,
  value: string,
  text: string,
  image: { avatar: boolean, src: string }
}

export interface Team {
  hasLogo: boolean,
  _id: string,
  teamNameShort: string,
  teamNameLong: string,
  country: FlagNameValues,
  logoPath: string
}

export interface NewTeam {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string,
  hasChangedLogo: boolean,
  newLogo: File | null
}

export interface NewMatch {
  teamA: string,
  teamB: string
}

export interface UpdateTeamWithNoImage {
  teamNameShort: string,
  teamNameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string
}

export interface UpdatePlayerNoImage {
  steam64id: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  team: string,
  hasImage: boolean
}

export interface NewPlayer {
  firstName: string,
  lastName: string,
  gameName: string,
  team: string,
  country: string,
  steam64Id: string,
  hasImage: boolean,
  imagePath: string,
  hasNewImage: boolean,
  newImage: null | File
}

export interface Player {
  hasImage: boolean,
  _id: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: FlagNameValues,
  steam64id: string,
  team: string,
  imagePath: string
}

export type Players = Player[]

export type Teams = Team[]

export interface Countries {
  countries: Country[]
}

export interface Maps {
  maps: string[]
}

export type HeaderSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'
