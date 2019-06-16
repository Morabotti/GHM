import { Merge } from "ts-essentials";
import { GameStateSpectating, Bomb, PlayerList } from 'csgo-gsi-types'

export enum EVENT {
  BOMB_PLANT = 'BOMB_PLANT',
  BOMB_DEFUSE = 'BOMB_DEFUSE',
  BOMB_EXPLODE = 'BOMB_EXPLODE',
  ROUND_START = 'ROUND_START',
  ROUND_END = 'ROUND_END',
  FREEZETIME_START = 'FREEZETIME_START',
  FREEZETIME_END = 'FREEZETIME_END',
  GAME_START = 'GAME_START',
  GAME_END = 'GAME_END',
  PAUSE_START = 'PAUSE_START',
  PAUSE_END = 'PAUSE_END',
  WARMUP_START = 'WARMUP_START',
  WARMUP_END = 'WARMUP_END',
  MAP_CHANGED = 'MAP_CHANGED',
  CLIENT_DISCONNECT = 'CLIENT_DISCONNECT',
  CLIENT_CONNECT = 'CLIENT_CONNECT',
  SERVER_DISCONNECT = 'SERVER_DISCONNECT',
  SERVER_CONNECT = 'SERVER_CONNECT'
}

export enum PHASE {
  FREEZETIME = 'freezetime',
  BOMB = 'bomb',
  WARMUP = 'warmup',
  LIVE = 'live',
  OVER = 'over',
  DEFUSE ='defuse'
}

export enum BOMB {
  PLANTED = 'planted',
  PLANTING = 'planting',
  EXPLODED = 'exploded',
  DEFUSING = 'defusing',
  DEFUSED = 'defused',
  CARRIED = 'carried',
  DROPPED = 'dropped'
}

export enum SOCKET {
  ALLPLAYERS = 'UPDATE_ALLPLAYERS',
  PLAYER = 'UPDATE_PLAYER',
  MAP = 'UPDATE_MAP',
  PHASE = 'UPDATE_PHASE',
  STATUS = 'UPDATE_STATUS',
  EVENTS = 'UPDATE_EVENTS',
  ROUND = 'UPDATE_ROUND',
  STATS = 'UPDATE_STATS',
  GAME_CONFIG = 'UPDATE_GAME_CONFIG',
  GAME_CONFIG_RESET = 'RESET_GAME_CONFIG',
  BOMB = 'UPDATE_BOMB',
  UPDATE_OVERLAY_CONFIG = 'UPDATE_OVERLAY_CONFIG'
}

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