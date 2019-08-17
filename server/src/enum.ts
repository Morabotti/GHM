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

export const formats = [
  { key: 'bo1', name: 'bo1', matchesPerTeam: 1, maps: 1, text: 'Best of 1' },
  { key: 'bo2', name: 'bo2', matchesPerTeam: 2, maps: 2, text: 'Best of 2' },
  { key: 'bo3', name: 'bo3', matchesPerTeam: 2, maps: 3, text: 'Best of 3' },
  { key: 'bo5', name: 'bo5', matchesPerTeam: 3, maps: 5, text: 'Best of 5' }
]
