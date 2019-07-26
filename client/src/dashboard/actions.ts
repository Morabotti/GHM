import {
  TeamList,
  MatchList,
  PlayerList
} from './types'

export type Action = { type: 'set-teams', teams: null | TeamList[] }
| { type: 'set-matches', matches: null | MatchList[] }
| { type: 'set-players', players: null | PlayerList[] }

export const setTeams = (teams: TeamList[] | null): Action => ({
  type: 'set-teams',
  teams
})

export const setMatches = (matches: MatchList[] | null): Action => ({
  type: 'set-matches',
  matches
})

export const setPlayers = (players: PlayerList[] | null): Action => ({
  type: 'set-players',
  players
})
