import { Action } from './actions'
import {
  ListElement,
  PlayerList,
  MatchList,
  TeamList
} from './types'

export interface State {
  teams: null | TeamList[],
  teamsDropdown: null | ListElement[],
  matches: null | MatchList[],
  players: null | PlayerList[]
}

const getDefaultState = (): State => ({
  teams: null,
  teamsDropdown: null,
  matches: null,
  players: null
})

export default function reducer (
  state: State = getDefaultState(),
  action: Action
): State {
  switch (action.type) {
    case 'set-teams':
      return {
        ...state,
        teams: action.teams,
        teamsDropdown: action.teams !== null
          ? action.teams.map(team => ({
            key: team._id,
            value: team.nameShort,
            text: team.nameShort,
            image: { avatar: team.hasLogo,
              src: team.hasLogo
                ? `/${team.logoPath}`
                : '/static/default/default-team.png'
            }
          }))
          : null
      }
    case 'set-players':
      return {
        ...state,
        players: action.players
      }
    case 'set-matches':
      return {
        ...state,
        matches: action.matches
      }
    default:
      return state
  }
}
