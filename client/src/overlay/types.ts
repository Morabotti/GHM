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

/*
export interface BombState {
  state: ('planted' | 'exploded' | 'planting' | 'defusing' | 'defused' | 'carried' | 'dropped'),
  position: number[],
  player?: string,
  countdown: string
}

export interface PhaseCooldowns {
  phase: string,
  phase_ends_in: number
}

export interface Round {
  phase?: 'live' | 'freezetime' | 'over',
  bomb?: 'planted' | 'defused' | 'exploded',
  win_team?: 'CT' | 'T'
}

export interface Team {
  score: number | null,
  name?: string,
  timeouts_remaining: number,
  matches_won_this_series: number
}

export interface MapState {
  mode: string,
  name: string,
  phase: string,
  round: number,
  team_ct: Team,
  team_t: Team,
  num_matches_to_win_series: number,
  current_spectators: number,
  souvenirs_total: number,
  round_wins: {[key: string]: string}[]
}

export interface WeaponDefault {
  name: string,
  paintkit: string,
  type: string,
  ammo_clip?: number,
  ammo_clip_max?: number,
  ammo_reserve?: number,
  state: string
}

export interface Weapons {
  [key: string]: WeaponDefault
}

export interface PlayerState {
  health: number,
  armor: number,
  helmet: boolean,
  defusekit?: boolean,
  flashed: number,
  burning: number,
  smoked: number,
  money: number,
  round_kills: number,
  round_killhs: number,
  round_totaldmg: number,
  equip_value: number
}

export interface MatchStats {
  kills: number,
  assists: number,
  deaths: number,
  mvps: number,
  score: number
}

export interface PlayerKey {
  name: string,
  observer_slot: number,
  team: Team,
  state: PlayerState,
  match_stats: MatchStats,
  weapons: Weapons,
  position: Vector,
  forward: Vector,
  watching: boolean
}
*/

/*
export interface CurrentPlayer {
  steamid: string,
  name: string,
  observer_slot: number,
  team: string,
  activity: string,
  state: PlayerState,
  spectarget?: string,
  position: Vector,
  forward: Vector,
  round_wins?: {[key: string]: string}[]
}

export interface AllPlayers {
  [key: string]: PlayerKey
}
*/
