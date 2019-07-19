import { Merge } from 'ts-essentials'
import { GameStateSpectating, Bomb, PlayerList } from 'csgo-gsi-types'

export interface StatsCalculation {
  CT: TeamStats
  T: TeamStats
}

export interface TeamStats {
  nades: {
    smokes: number
    grenades: number
    molotovs: number
    flashes: number
  }
  teamEconomy: number
}

export interface Configs {
  useRadar: boolean
}

export type TeamType = 'T' | 'CT'

export interface Country {
  key: string
  value: string
  flag: string
  text: string
}

export type ListElement = {
  key: string
  value: string
  text: string
  image: { avatar: boolean, src: string }
}

export interface Countries {
  countries: Array<Country>
}

export interface Maps {
  maps: Array<string>
}

export interface PlayerSchema {
  firstName: string
  lastName: string
  gameName: string
  country: string
  steam64id: string
  team: string
  hasImage: boolean
  imagePath: string | null
}

export interface TeamSchema {
  teamNameShort: string
  teamNameLong: string
  country: string
  hasLogo: boolean
  logoPath: string
}

export interface MatchSchema {
  teamA: string
  teamB: string
  isLive: boolean
}

interface __NewPlayerList {
  position: string | string[]
  forward: string | string[]
  watching: boolean
}

export type CustomPlayerList = Merge<PlayerList, __NewPlayerList>
export type CustomBomb = Merge<Bomb, {position: string | string[]}>

export interface CustomAllPlayer {
  [steamid: string]: CustomPlayerList
}

interface __CustomGameState {
  bomb: CustomBomb,
  allplayers: CustomAllPlayer
}

export type GameState = Merge<GameStateSpectating, __CustomGameState>

export interface RefactoredMatch {
  teamA: TeamConfig
  teamB: TeamConfig
  players: {
    [key: string]: PlayerConfig
  }
}

export interface RawMatch {
  match: RMatch
  teams: Array<RTeam>
  players: Array<RPlayer>
}

export interface RMatch {
  isLive: boolean
  _id: string
  teamA: string
  teamB: string
}

export interface RTeam {
  hasLogo: boolean
  _id: string
  teamNameShort: string
  teamNameLong: string | null
  country: string | null
  logoPath: string | null
}

export interface RPlayer {
  hasImage: boolean
  _id: string
  steam64id: string,
  firstName: string | null,
  lastName: string | null,
  gameName: string,
  country: string | null,
  team: string,
  imagePath: string | null,
}

export interface TeamConfig {
  team: TeamType
  customName: null | string
  customLogo: null | string
  country: null | string
  players: {
    [key: string]: PlayerConfig
  }
}

export interface PlayerConfig {
  teamName: string
  firstName: string | null
  lastName: string | null
  gameName: string | null
  country: string | null
  hasImage: boolean
  imagePath: string | null
}