import { Merge } from 'ts-essentials'
import { GameStateSpectating, Bomb, PlayerList, TeamType } from 'csgo-gsi-types'
import { Document } from 'mongoose'

export interface Country {
  key: string,
  value: string,
  flag: string,
  text: string
}

export interface Countries {
  countries: Country[]
}

export interface Maps {
  maps: string[]
}

export interface PlayerSchema {
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  steam64id: string,
  team: string,
  hasImage: boolean,
  imagePath: string | null
}

export interface TeamSchema {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string
}

export interface MatchSchema {
  teamA: string,
  teamB: string,
  isLive: boolean
}

/*
export interface RefactoredMatch {
  teamA: TeamConfig,
  teamB: TeamConfig,
  players: {
    [key: string]: PlayerConfig
  }
}
*/

export interface RawMatch {
  match: RMatch,
  teams: RTeam[],
  players: RPlayer[]
}

export interface RMatch {
  isLive: boolean,
  _id: string,
  teamA: string,
  teamB: string
}

export interface RTeam {
  hasLogo: boolean,
  _id: string,
  nameShort: string,
  nameLong: string | null,
  country: string | null,
  logoPath: string | null
}

export interface RPlayer {
  hasImage: boolean,
  _id: string,
  steam64id: string,
  firstName: string | null,
  lastName: string | null,
  gameName: string,
  country: string | null,
  team: string,
  imagePath: string | null
}

/*
export interface TeamConfig {
  team: TeamType,
  customName: null | string,
  customLogo: null | string,
  country: null | string,
  players: PlayerConfig[]
}
*/

/*
export interface PlayerConfig {
  teamName: string,
  firstName: string | null,
  lastName: string | null,
  gameName: string | null,
  country: string | null,
  hasImage: boolean,
  steam64ID: string,
  imagePath: string | null
}
*/

/**
 * NEW TYPES
 */

export interface StatsCalculation {
  CT: TeamStats,
  T: TeamStats
}

export interface TeamStats {
  nades: {
    smokes: number,
    grenades: number,
    molotovs: number,
    flashes: number
  },
  teamEconomy: number
}

interface __NewPlayerList {
  position: string | string[],
  forward: string | string[],
  watching: boolean
}

export type CustomPlayerList = Merge<PlayerList, __NewPlayerList>
export type CustomBomb = Merge<Bomb, { position: string | string[] }>

export interface CustomAllPlayer {
  [steamid: string]: CustomPlayerList
}

interface __CustomGameState {
  bomb: CustomBomb,
  allplayers: CustomAllPlayer
}

export type GameState = Merge<GameStateSpectating, __CustomGameState>

export interface MatchModel extends Document {
  teamA: string,
  teamB: string,
  isLive: boolean,
  format: string,
  maps: string[],
  scoreA: number,
  scoreB: number
}

export interface PlayerModel extends Document {
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  steam64ID: string,
  team: string,
  hasImage: boolean,
  imagePath: string | null
}

export interface TeamModel extends Document {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string | null
}

export interface TeamModelSpecific extends Document {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  players: PlayerModel[],
  logoPath: string | null
}

export interface TeamType {
  _id: string,
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string | null
}

export interface MatchModelList extends Document {
  teamA: TeamModel,
  teamB: TeamModel,
  isLive: boolean,
  maps: string[],
  format: string,
  scoreA: number,
  scoreB: number
}

export interface MatchSpecific {
  _id: string,
  teamA: TeamModelSpecific,
  teamB: TeamModelSpecific,
  isLive: boolean,
  maps: string[],
  format: string,
  scoreA: number,
  scoreB: number
}

export interface MatchSpecificModelOverlay extends Document {
  teamA: TeamModel,
  teamB: TeamModel,
  players: PlayerModel[],
  isLive: boolean,
  maps: string[],
  format: string,
  scoreA: number,
  scoreB: number
}

export interface UpdateActiveScore {
  scoreA: number,
  scoreB: number
}

export interface TeamSpecific extends Document {
  nameShort: string,
  nameLong: string,
  country: string,
  hasLogo: boolean,
  logoPath: string | null,
  players: PlayerModel[]
}

export interface PlayerSpecific extends Document {
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  steam64ID: string,
  team: TeamModel,
  hasImage: boolean,
  imagePath: string | null
}

export interface RefactoredMatchPlayer {
  firstName: string,
  lastName: string,
  gameName: string,
  country: string,
  steam64ID: string,
  team: string,
  hasImage: boolean,
  imagePath: string | null
}

export interface MatchFormat {
  key: string,
  name: string,
  matchesPerTeam: number,
  maps: number,
}

export interface RefactoredMatchTeam {
  team: TeamType,
  customName: string,
  customLogo: string | null,
  country: string,
  players: RefactoredMatchPlayer[]
}

export interface RefactoredMatch {
  _id?: string,
  teamA: RefactoredMatchTeam,
  teamB: RefactoredMatchTeam,
  players: {
    [key: string]: RefactoredMatchPlayer
  },
  maps: string[],
  scoreA: number,
  scoreB: number,
  format: MatchFormat | null
}
