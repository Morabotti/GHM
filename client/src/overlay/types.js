// @flow
import type { Action as _Action } from './actions'

export type Action = _Action

export type Dispatch = (Action) => void

export type Teams = ('CT' | 'T')

export type Vector = Array<string>

export type Events = 'FREEZETIME_END' | 'FREEZETIME_START'

export type EventsReducer = {
  moneyCount: boolean
}

export type Nades = {
  smokes: number,
  grenades: number,
  molotovs: number,
  flashes: number
}

export type TeamStat = {
  nades: Nades,
  teamEconomy: number
}

export type TeamStats = {
  CT: TeamStat,
  T: TeamStat
}

export type BombState = {
  state: ('planted' | 'exploded' | 'planting' | 'defusing' | 'defused' | 'carried' | 'dropped'),
  position: string,
  player?: string,
  countdown?: string
}

export type EventType = {
  event: Events,
  payload: any
}

export type PhaseCooldowns = {
  phase: string,
  phase_ends_in: number
}

export type Team = {
  score: number | null,
  name?: string,
  timeouts_remaining: number,
  matches_won_this_series: number
}

export type MapState = {
  mode: string,
  name: string,
  phase: string,
  round: number,
  team_ct: Team,
  team_t: Team,
  num_matches_to_win_series: number,
  current_spectators: number,
  souvenirs_total: number
}

export type WeaponDefault = {
  name: string,
  paintkit: string,
  type: string,
  ammo_clip?: number,
  ammo_clip_max?: number,
  ammo_reserve?: number,
  state: string
}

export type Weapons = {
  [string]: WeaponDefault
}

export type PlayerState = {
  health: number,
  armor: number,
  helmet: boolean,
  defusekit?: boolean,
  flashed: number,
  burning: number,
  money: number,
  round_kills: number,
  round_killhs: number,
  round_totaldmg: number,
  equip_value: number
}

export type MatchStats = {
  kills: number,
  assists: number,
  deaths: number,
  mvps: number,
  score: number
}

export type PlayerKey = {
  name: string,
  observer_slot: number,
  team: string,
  state: PlayerState,
  match_stats: MatchStats,
  weapons: Weapons,
  position: Vector,
  forward: Vector,
  watching: boolean
}

export type StateTeamConfig ={
  teamA: TeamConfig,
  teamB: TeamConfig,
  players: {
    [string]: PlayerConfig
  }
}

export type TeamConfig = {
  team: Teams,
  customName: null | string,
  customLogo: null | string,
  country: null | string,
  players: {
    [string]: PlayerConfig
  }
}

export type PlayerConfig = {
  teamName: string,
  firstName: string | null,
  lastName: string | null,
  gameName: string | null,
  country: string | null,
  hasImage: boolean,
  imagePath: string | null
}

export type CurrentPlayer = {
  steamid: string,
  name: string,
  observer_slot: number,
  team: string,
  activity: string,
  state: PlayerState,
  spectarget?: string,
  position: Vector,
  forward: Vector
}

export type AllPlayers = {
  [string]: PlayerKey
}
