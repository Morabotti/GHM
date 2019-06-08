import Player from '../models/Player'
import Match from '../models/Match'
import Team from '../models/Team'

import {
  dispatchSocket
} from '../handler/SocketIo'

import { Error } from 'mongoose'
import {
  RefactoredMatch,
  Allplayers,
  RawMatch,
  RPlayer,
  SOCKET
} from '../types'

const TIMEOUT_TEAMCHANGE = 5000

class MatchCore {
  raw: RawMatch | any
  refactored: RefactoredMatch | any
  latelyChanged: boolean

  constructor () {
    this.raw = null
    this.refactored = null
    this.latelyChanged = false
  }

  testTeamSides = (allplayers: Allplayers) => {
    if (this.refactored !== null) {
      const needSwitch = this.calculateTeams(allplayers)

      if (needSwitch && !this.latelyChanged) {
        this.latelyChanged = true
        setTimeout(() => {
          this.latelyChanged = false
        }, TIMEOUT_TEAMCHANGE)

        this._switchActiveTeams()
          .then(x => this.dispatchActive())
          .catch(e => console.log(e))
      }
    }
  }

  calculateTeams = (allplayers: Allplayers): boolean => {
    let aOnSame = 0
    let aOnDifferent = 0
    let bOnSame = 0
    let bOnDifferent = 0

    const teamATeam = this.refactored.teamA.team
    const teamBTeam = this.refactored.teamB.team

    const teamAPlayers = this.refactored.teamA.players
    const teamBPlayers = this.refactored.teamB.players

    Object.keys(teamAPlayers).forEach((value, index) => {
      if (allplayers[value] !== undefined) {
        if(allplayers[value].team === teamATeam)
          aOnSame++
          
        else if(allplayers[value].team === teamBTeam)
          aOnDifferent++
      }
    })

    Object.keys(teamBPlayers).forEach((value, index) => {
      if (allplayers[value] !== undefined) {
        if(allplayers[value].team === teamBTeam)
          bOnSame++

        else if(allplayers[value].team === teamATeam)
          bOnDifferent++
      }
    })

    if(aOnDifferent >= 3 || bOnDifferent >= 3)
      return true

    return false
  }

  filterActiveMatchData = (data: RawMatch): RefactoredMatch | null => {
    let teamAPlayers = { }
    let teamBPlayers = { }

    const pTeamA = data.teams.find((val: any) => val._id == data.match.teamA )
    const pTeamB = data.teams.find((val: any) => val._id == data.match.teamB )

    if (pTeamA === undefined || pTeamB === undefined) {
      console.log("No team found!")
      return null
    }

    data.players.map((player: RPlayer) => {
      const playerData = {
        teamName: player.team,
        firstName: player.firstName,
        lastName: player.lastName,
        gameName: player.gameName,
        country: player.country,
        hasImage: player.hasImage,
        imagePath: player.hasImage ? player.imagePath : null
      }

      if(player.team === pTeamA.teamNameShort)
        teamAPlayers[player.steam64id] = playerData
      else
        teamBPlayers[player.steam64id] = playerData
    })

    const teamA = {
      team: 'CT',
      customName: pTeamA.teamNameShort,
      customLogo: pTeamA.hasLogo ? pTeamA.logoPath : null,
      country: pTeamA.country,
      players: teamAPlayers
    }

    const teamB = {
      team: 'T',
      customName: pTeamB.teamNameShort,
      customLogo: pTeamB.hasLogo ? pTeamB.logoPath : null,
      country: pTeamB.country,
      players: teamBPlayers
    }
    
    this.refactored = {teamA, teamB, players: { ...teamAPlayers, ...teamBPlayers }}
    return this.refactored
  }

  _toggleActiveMatch = (id: string) => {
    return new Promise((resolve, reject) => {
      Match.findById(id, (err: Error, match: any) => {
        if (err) return reject('There was a problem finding the match.')
    
        if (match.isLive) {
          Match.findByIdAndUpdate(
            id,
            {$set: {isLive: false}},
            (err: Error, newMatch: any) => {
              if (err) return reject('There was a problem updating the match.')

              this.dispatchActive()

              return resolve(newMatch)
          })
        } else {
          Match.updateMany(
            {isLive: true},
            {$set: {isLive: false}},
            {multi: true},
            (err: Error, match: any) => {
              if (err) return reject('There was problem replacing players new team')

              Match.findByIdAndUpdate(
                id,
                {$set: {isLive: true}},
                { new: true },
                (err: Error, newMatch: any) => {
                if (err) return reject('There was a problem updating the match.')

                this.dispatchActive()

                return resolve(newMatch)
            })
          })
        }
      })
    })
  }

  dispatchActive = async () => {
    try {
      const activeData = await matchCore._getActiveMatchData()
      const refactored = matchCore.filterActiveMatchData(activeData)

      dispatchSocket(
        SOCKET.TEAM_CONFIG,
        refactored
      )
    } catch(e) {
      return console.log(e)
    }
  }

  dispatchActiveDelete = () => {
    dispatchSocket(
      SOCKET.GAME_CONFIG_RESET,
      null
    )
  }

  _switchActiveTeams = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      Match.findOne({ isLive: true }, (err: Error, match: any) => {
        if (err) return reject('There was a problem finding the match.')

        Match.findByIdAndUpdate(match._id,
          {$set: {teamA: match.teamB, teamB: match.teamA}},
          { new: true }, (err: Error, newMatch: any) => {
            if (err) return reject('There was a problem switching the sides.')

            return resolve(newMatch)
        })
      })
    })
  }

  _getActiveMatchData = ():Promise<RawMatch> => {
    return new Promise((resolve, reject) => {
      Match.findOne({ isLive: true }, (err: Error, match: any) => {
        if (err) reject(err)
  
        if (match === null) {
          this.dispatchActiveDelete()
          return reject('Clearing match.')
        }

        Team.find({'_id': {$in: [
          match.teamA,
          match.teamB
        ]}}, (err: Error, teams: any) => {
          if (err) reject(err)
  
          Player.find({$or:[ {team: teams[0].teamNameShort},{team: teams[1].teamNameShort} ]}, (err: Error, players: any) => {
            if (err) reject(err)
  
            this.raw = {match, teams, players}
            resolve(this.raw)
          })
        })
      })
    })
  }
}

const matchCore = new MatchCore()

export default matchCore
