import {
  MatchModel,
  MatchModelList,
  TeamType,
  MatchSpecific,
  CustomAllPlayer,
  RefactoredMatch,
  TeamModelSpecific
} from '../types'

import { TeamType as TType } from 'csgo-gsi-types'

import Match from '../models/Match'
import { Types, Error } from 'mongoose'

import { dispatchSocket } from '../handler/SocketIo'
import { SOCKET } from '../enum'

class LiveMatchCore {
  refactored: RefactoredMatch | null
  latelyChanged: boolean

  constructor () {
    this.refactored = null
    this.latelyChanged = false
  }

  formatTeam = (team: TeamModelSpecific, side: TType) => ({
    team: side,
    customName: team.nameShort,
    customLogo: team.hasLogo ? team.logoPath : null,
    country: team.country,
    players: team.players
  })

  testTeamSides = (allplayers: CustomAllPlayer) => {
    if (this.refactored !== null) {
      const needSwitch = this.calculateTeams(allplayers)

      if (needSwitch && !this.latelyChanged) {
        this.latelyChanged = true
        setTimeout(() => {
          this.latelyChanged = false
        }, 5000)

        this.switchActiveTeams()
          .then(() => this.dispatchActive())
          .catch(e => console.log(e))
      }
    }
  }

  calculateTeams = (allplayers: CustomAllPlayer): boolean => {
    if (this.refactored === null || Object.keys(allplayers).length === 0) {
      return false
    }

    let aOnDifferent = 0
    let bOnDifferent = 0

    const teamATeam = this.refactored.teamA.team
    const teamBTeam = this.refactored.teamB.team

    const teamAPlayers = this.refactored.teamA.players
    const teamBPlayers = this.refactored.teamB.players

    Object.keys(teamAPlayers).forEach(value => {
      if (allplayers[value] !== undefined) {
        if (allplayers[value].team === teamBTeam) {
          aOnDifferent++
        }
      }
    })

    Object.keys(teamBPlayers).forEach(value => {
      if (allplayers[value] !== undefined) {
        if (allplayers[value].team === teamATeam) {
          bOnDifferent++
        }
      }
    })

    if (aOnDifferent >= 3 || bOnDifferent >= 3) {
      return true
    }

    return false
  }

  switchActiveTeams = (): Promise<MatchModel> => {
    return new Promise((resolve, reject) => {
      Match.findOne({ isLive: true }, (err: Error, match: MatchModel) => {
        if (err) {
          return reject('There was a problem finding the match.')
        }

        Match.findByIdAndUpdate(match._id,
          { $set: { teamA: match.teamB, teamB: match.teamA } },
          { new: true }, (err: Error, newMatch: MatchModel | null) => {
            if (err || newMatch === null) {
              return reject('There was a problem switching the sides.')
            }

            return resolve(newMatch)
          })
      })
    })
  }

  dispatchActiveDelete = () => {
    dispatchSocket(
      SOCKET.GAME_CONFIG_RESET,
      null
    )
  }

  dispatchActive = async () => {
    try {
      const activeMatch = await getActiveMatch()
      const players = [
        ...activeMatch.teamA.players,
        ...activeMatch.teamB.players
      ]

      let playerObj = { }
      players.map(p => {
        playerObj[p.steam64ID] = p
      })

      const refactored = {
        teamA: this.formatTeam(activeMatch.teamA, 'CT'),
        teamB: this.formatTeam(activeMatch.teamB, 'T'),
        players: { ...playerObj }
      }

      dispatchSocket(
        SOCKET.GAME_CONFIG,
        refactored
      )
    }
    catch (e) {
      return console.log(e)
    }
  }
}

export const liveMatchCore = new LiveMatchCore()

interface NewMatch {
  teamA: TeamType,
  teamB: TeamType,
  format: string,
  maps: string[]
}

export const createMatch = ({
  teamA,
  teamB,
  maps,
  format
}: NewMatch): Promise<MatchModelList> => new Promise(
  (resolve, reject) => {
    Match.create({
      teamA: teamA._id,
      teamB: teamB._id,
      maps,
      format
    }, (err: Error, match: MatchModel) => {
      if (err) {
        return reject('There was a problem adding the information to the database.')
      }

      Match.aggregate([
        { $match: { _id: Types.ObjectId(match._id) } },
        {
          $lookup: {
            from: 'teams',
            localField: 'teamA',
            foreignField: '_id',
            as: 'teamA'
          }
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'teamB',
            foreignField: '_id',
            as: 'teamB'
          }
        },
        { $unwind: '$teamB' },
        { $unwind: '$teamA' },
        {
          $project: {
            _id: 1,
            teamA: '$teamA',
            teamB: '$teamB',
            format: 1,
            maps: 1,
            scoreA: 1,
            scoreB: 1,
            isLive: 1
          }
        },
        { $limit: 1 }
      ])
        .exec((err: Error, match) => {
          if (err) {
            return reject('There was problem returning match.')
          }

          if (match[0] === undefined) {
            return reject('Query error.')
          }

          return resolve(match[0])
        })
    })
  }
)

export const fetchMatches = (): Promise<MatchModelList[]> => new Promise(
  (resolve, reject) => {
    Match.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: 'teamA',
          foreignField: '_id',
          as: 'teamA'
        }
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamB',
          foreignField: '_id',
          as: 'teamB'
        }
      },
      { $unwind: '$teamB' },
      { $unwind: '$teamA' },
      {
        $project: {
          _id: 1,
          teamA: '$teamA',
          teamB: '$teamB',
          format: 1,
          maps: 1,
          scoreA: 1,
          scoreB: 1,
          isLive: 1
        }
      }
    ])
      .exec((err: Error, matches) => {
        if (err) {
          return reject('There was problem finding matches.')
        }

        return resolve(matches)
      })
  }
)

export const getMatch = (
  id: MatchModel['_id']
): Promise<MatchSpecific> => new Promise(
  (resolve, reject) => {
    Match.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamA',
          foreignField: '_id',
          as: 'teamA'
        }
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamB',
          foreignField: '_id',
          as: 'teamB'
        }
      },
      { $unwind: '$teamB' },
      { $unwind: '$teamA' },
      {
        $project: {
          _id: 1,
          teamA: '$teamA',
          teamB: '$teamB',
          format: 1,
          maps: 1,
          scoreA: 1,
          scoreB: 1,
          isLive: 1
        }
      },
      { $limit: 1 }
    ])
      .exec((err: Error, match) => {
        if (err) {
          return reject('There was a problem finding the match.')
        }

        if (match[0] === undefined) {
          return reject(null)
        }

        return resolve(match[0])
      })
  }
)

export const deleteMatch = (
  id: MatchModel['_id']
): Promise<string> => new Promise(
  (resolve, reject) => {
    Match.findByIdAndRemove(id, (err: Error, match: MatchModel | null) => {
      if (err || match === null) {
        return reject('There was a problem deleting the match.')
      }

      return resolve(`Match was deleted.`)
    })
  }
)

export const updateMatch = (
  id: MatchModel['_id'],
  { teamA, teamB }: NewMatch
): Promise<MatchModel> => new Promise(
  (resolve, reject) => {
    Match.findByIdAndUpdate(
      id,
      { teamA, teamB },
      { new: true },
      (err: Error, match: MatchModel | null) => {
        if (err || match === null) {
          return reject('There was a problem updating the match.')
        }

        return resolve(match)
      })
  }
)

export const toggleMatchToLive = (
  id: MatchModel['_id']
): Promise<MatchModel> => new Promise(
  (resolve, reject) => {
    Match.findById(id, (err: Error, match: MatchModel) => {
      if (err) {
        return reject('There was a problem finding the match.')
      }

      if (match.isLive) {
        Match.findByIdAndUpdate(
          id,
          { $set: { isLive: false } },
          (err: Error, newMatch: MatchModel | null) => {
            if (err || newMatch === null) {
              return reject('There was a problem updating the match.')
            }
            liveMatchCore.dispatchActive()
            return resolve(newMatch)
          })
      }
      else {
        Match.updateMany(
          { isLive: true },
          { $set: { isLive: false } },
          { multi: true },
          (err: Error) => {
            if (err) {
              return reject('There was problem replacing players new team')
            }

            Match.findByIdAndUpdate(
              id,
              { $set: { isLive: true } },
              { new: true },
              (err: Error, newMatch: MatchModel | null) => {
                if (err || newMatch === null) {
                  return reject('There was a problem updating the match.')
                }
                liveMatchCore.dispatchActive()
                return resolve(newMatch)
              })
          })
      }
    })
  }
)

export const getActiveMatch = (): Promise<MatchSpecific> => new Promise(
  (resolve, reject) => {
    Match.aggregate([
      { $match: { isLive: true } },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamA',
          foreignField: '_id',
          as: 'teamA'
        }
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamB',
          foreignField: '_id',
          as: 'teamB'
        }
      },
      { $unwind: '$teamB' },
      { $unwind: '$teamA' },
      {
        $lookup: {
          from: 'players',
          let: { 'teamAName': '$teamA.nameShort' },
          pipeline: [
            { $match: { $expr: { $eq: ['$team', '$$teamAName'] } } },
            { $project: { _id: 0 } }
          ],
          as: 'teamAPlayers'
        }
      },
      {
        $lookup: {
          from: 'players',
          let: { 'teamBName': '$teamB.nameShort' },
          pipeline: [
            { $match: { $expr: { $eq: ['$team', '$$teamBName'] } } },
            { $project: { _id: 0 } }
          ],
          as: 'teamBPlayers'
        }
      },
      {
        $project: {
          _id: 1,
          teamA: '$teamA',
          teamB: '$teamB',
          teamAPlayers: '$teamAPlayers',
          teamBPlayers: '$teamBPlayers',
          format: 1,
          maps: 1,
          scoreA: 1,
          scoreB: 1,
          isLive: 1
        }
      },
      { $limit: 1 }
    ])
      .exec((err: Error, match) => {
        if (err) {
          return reject('There was problem finding match.')
        }

        if (match[0] === undefined) {
          liveMatchCore.dispatchActiveDelete()
          return reject(null)
        }

        const activeMatch: MatchSpecific = {
          _id: match[0]._id,
          teamA: {
            ...match[0].teamA,
            players: match[0].teamAPlayers
          },
          teamB: {
            ...match[0].teamB,
            players: match[0].teamBPlayers
          },
          maps: match[0].maps,
          format: match[0].format,
          isLive: match[0].isLive,
          scoreA: match[0].scoreA,
          scoreB: match[0].scoreB,
        }

        resolve(activeMatch)
      })
  }
)
