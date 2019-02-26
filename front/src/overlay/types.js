// @flow
import type { Action as _Action } from './actions'

export type Action = _Action

export type Dispatch = (Action) => void

export type Teams = ('CT' | 'T')

export type Vector = Array<string>

export type Team = {
  score: number;
  timeouts_remaining: number;
  matches_won_this_series: number;
}

export type MapState = {
  mode: string;
  name: string;
  phase: string;
  round: number;
  team_ct: Team;
  team_t: Team;
  num_matches_to_win_series: number;
  current_spectators: number;
  souvenirs_total: number;
}

export type WeaponMelee = {
  name: string,
  paintkit: string,
  type: string,
  state: string
}

export type WeaponDefault = {
  name: string,
  paintkit: string,
  type: string,
  ammo_clip: number,
  ammo_clip_max: number,
  ammo_reserve: number,
  state: string
}

export type Weapons = {
  weapon_0: WeaponMelee,
  weapon_1?: WeaponDefault,
  weapon_2?: WeaponDefault
}

export type PlayerState = {
  health: number,
  armor: number,
  helmet: boolean,
  defusekit: boolean,
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

export type AllPlayers = {
  [string]: PlayerKey
}
