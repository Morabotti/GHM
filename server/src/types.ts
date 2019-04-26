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
  OVER = 'over', // ? PAUSE & GAME END
  DEFUSE ='defuse'
}

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

export interface Country {
  key: string,
  value: string,
  flag: string,
  text: string
}

export interface Countries {
  countries: Array<Country>
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

export type TeamType = 'T' | 'CT'

export interface Sockets {
  allPlayers: string
  player: string
  map: string
  phase: string,
  updates: string,
  events: string,
  stats: string
}

// ! FIX any properties ! //
export interface GameState {
  provider: Provider
  map: CurrentMap | any
  player: Player | any
  allplayers: Allplayers | any
  phase_countdowns: Phase_countdowns | any
  grenades: Grenades
  previously: Previously
  auth: Auth
}

export interface Provider {
  name: string
  appid: number
  version: number
  steamid: string
  timestamp: number
}

export interface CurrentMap {
  mode: string
  name: string
  phase: PHASE
  round: number
  team_ct: Team
  team_t: Team
  num_matches_to_win_series: number
  current_spectators: number
  souvenirs_total: number
}

export interface Team {
  score: number
  consecutive_round_losses: number,
  timeouts_remaining: number
  matches_won_this_series: number
}

export interface Player {
  steamid?: string
  name?: string
  observer_slot?: number
  team?: string
  activity?: string
  state?: State
  spectarget?: string
  position: string | string[]
  forward: string | string[]
}

export interface State {
  health: number
  armor: number
  helmet: boolean
  flashed: number
  smoked?: number
  burning: number
  money: number
  round_kills: number
  round_killhs: number
  round_totaldmg: number
  equip_value: number
  defusekit?: boolean
}

export interface Allplayers {
  [key: number]: PlayerList
}

export interface PlayerList {
  name?: string
  observer_slot?: number
  team?: string
  state?: State
  match_stats?: Match_stats
  weapons: Weapons
  position: string | string[]
  forward: string | string[]
}

export interface Match_stats {
  kills: number
  assists: number
  deaths: number
  mvps: number
  score: number
}

export interface Weapons {
  [key: string]: Weapon
}

export interface Weapon {
  name: string
  paintkit?: string
  type: string
  state: string
  ammo_clip?: number
  ammo_clip_max?: number
  ammo_reserve?: number
}

interface Phase_countdowns {
  phase: PHASE
  phase_ends_in: string
}

export interface Grenades {
  [key: string]: Grenade
}

export interface Grenade {
  owner?: number
  position: string
  velocity: string
  lifetime: string
  type?: string
  effecttime?: string
}

export interface Previously {
  player?: Player
  allplayers?: Allplayers
  phase_countdowns?: Phase_countdowns
  grenades?: Grenades,
  map?: CurrentMap
}

export interface Auth {
  token: string
}
