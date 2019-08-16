import { Action as _Action } from './actions'
import { Action as CommonAction } from '../common/actions'
import { FlagNameValues } from 'semantic-ui-react'

export type Action = _Action

export type Dispatch = (action: Action | CommonAction) => void

export type HeaderSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'

export interface ListElement {
  key: string,
  value: string,
  text: string,
  image: { avatar: boolean, src: string }
}

export interface Match {
  _id?: string,
  teamA: string,
  teamB: string,
  isLive: boolean,
  scoreA: number,
  scoreB: number,
  format: string,
  maps: string[]
}

export interface TeamList {
  _id: string,
  nameShort: string,
  nameLong: string,
  country: FlagNameValues,
  hasLogo: boolean,
  logoPath: string
}

export interface MatchList {
  _id: string,
  teamA: TeamList,
  teamB: TeamList,
  isLive: boolean,
  format: string,
  maps: string[],
  scoreA: number,
  scoreB: number
}

export interface PlayerList {
  _id: string,
  steam64ID: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: FlagNameValues,
  team: string,
  hasImage: boolean,
  imagePath: string
}

export interface TeamSpecific {
  _id: string,
  nameLong: string,
  nameShort: string,
  country: FlagNameValues,
  hasLogo: boolean,
  logoPath: string,
  players: PlayerList[]
}

export interface PlayerSpecific {
  _id: string,
  steam64ID: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: FlagNameValues,
  team: TeamList,
  hasImage: boolean,
  imagePath: string
}

export interface UpdatePlayer {
  steam64ID: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  team: string,
  hasImage: boolean,
  image: File | null
}

export interface UpdateTeam {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logo: File | null
}

export interface UpdateTeamInfo {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean
}

export interface UpdatePlayerInfo {
  steam64ID: string,
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  team: string,
  hasImage: boolean
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

export interface NewPlayer {
  firstName: string,
  lastName: string,
  gameName: string,
  team: string,
  country: string,
  steam64ID: string,
  hasImage: boolean,
  imagePath: string,
  hasNewImage: boolean,
  newImage: null | File
}

export interface NewMatch {
  teamA: TeamList,
  teamB: TeamList,
  format: string,
  maps: string[]
}

export interface MatchSpecific {
  _id: string,
  teamA: TeamSpecific,
  teamB: TeamSpecific,
  isLive: boolean,
  format: string,
  maps: string[],
  scoreA: number,
  scoreB: number
}
