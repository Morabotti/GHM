import {
  TeamList,
  MatchList,
  PlayerList,
  PlayerSpecific,
  MatchSpecific,
  TeamSpecific,
  UpdateTeamInfo,
  UpdatePlayerInfo,
  NewMatch,
  ActiveMatchResponse
} from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const fetchTeams = (): Promise<TeamList[]> => fetch(
  '/api/teams',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchPlayers = (): Promise<PlayerList[]> => fetch(
  '/api/players',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchMatches = (): Promise<MatchList[]> => fetch(
  '/api/matches',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getTeam = (
  id: string
): Promise<TeamSpecific> => fetch(
  '/api/teams/' + id,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getPlayer = (
  id: string
): Promise<PlayerSpecific> => fetch(
  '/api/players/' + id,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getMatch = (
  id: string
): Promise<MatchSpecific> => fetch(
  '/api/matches/' + id,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addPlayer = (
  data: FormData
): Promise<PlayerList> => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch('/api/players', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const addTeam = (
  data: FormData
): Promise<TeamList> => {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch('/api/teams', options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const removeTeam = (
  id: string
) => fetch(
  '/api/teams/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const updateTeamWithLogo = (
  data: FormData,
  id: string
): Promise<TeamList> => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch(`/api/teams/newlogo/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updateTeam = (
  data: UpdateTeamInfo,
  id: string
): Promise<TeamList> => fetch(
  `/api/teams/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const removePlayer = (
  id: string
) => fetch(
  '/api/players/' + id,
  {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }
)
  .then(checkResponse)

export const updatePlayerWithImage = (
  data: FormData,
  id: string
): Promise<PlayerList> => {
  const options = {
    method: 'PUT',
    body: data,
    headers: { 'content-type': 'multipart/form-data' }
  }

  delete options.headers['content-type']

  return fetch(`/api/players/newimg/${id}`, options)
    .then(checkResponse)
    .then((res) => res.json())
}

export const updatePlayer = (
  data: UpdatePlayerInfo,
  id: string
): Promise<PlayerList> => fetch(
  `/api/players/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const getActiveMatch = (): Promise<ActiveMatchResponse> => fetch(
  `/api/matches/active`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const forceLoadMatches = (): Promise<Response> => fetch(
  '/api/matches/live',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const addMatch = (match: NewMatch): Promise<MatchList> => fetch(
  '/api/matches',
  {
    method: 'POST',
    body: JSON.stringify(match),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const setMatchToLive = (id: string): Promise<MatchList> => fetch(
  `/api/matches/live/${id}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const removeMatch = (id: string): Promise<Response> => fetch(
  `/api/matches/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
