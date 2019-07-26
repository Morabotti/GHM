import { Merge } from 'ts-essentials'
import { GameStateSpectating, Bomb, PlayerList, TeamType } from 'csgo-gsi-types'

import { Action as _Action } from './actions'
import { Action as CommonAction } from '../common/actions'

export type Action = _Action

export type Dispatch = (action: Action | CommonAction) => void

export type Events = 'FREEZETIME_END' | 'FREEZETIME_START'

export interface EventsReducer {
  moneyCount: boolean
}

export interface Nades {
  smokes: number,
  grenades: number,
  molotovs: number,
  flashes: number
}

export interface TeamStat {
  nades: Nades,
  teamEconomy: number
}

export interface TeamStats {
  CT: TeamStat,
  T: TeamStat
}

interface __NewPlayerList {
  position: [number, number, number],
  forward: [number, number, number],
  watching: boolean
}

interface __NewBombState {
  position: [number, number, number]
}

export type CustomPlayerList = Merge<PlayerList, __NewPlayerList>
export type Bomb = Merge<Bomb, __NewBombState>

export interface AllPlayers {
  [steamid: string]: CustomPlayerList
}

interface __CustomGameState {
  bomb: Bomb,
  allplayers: AllPlayers
}

export type GameState = Merge<GameStateSpectating, __CustomGameState>

export interface PlayerConfig {
  teamName: string,
  firstName: string | null,
  lastName: string | null,
  gameName: string | null,
  country: string | null,
  hasImage: boolean,
  imagePath: string | null
}

export interface TeamConfig {
  team: TeamType,
  customName: null | string,
  customLogo: null | string,
  country: null | string,
  players: {
    [key: string]: PlayerConfig
  }
}

export interface StateTeamConfig {
  teamA: TeamConfig,
  teamB: TeamConfig,
  players: {
    [key: string]: PlayerConfig
  }
}

export interface LevelRange {
  min: number,
  max: number
}

export interface MultipleLevels {
  lower: LevelRange,
  default: LevelRange
}

export type HasMultipleLevels = null | MultipleLevels
