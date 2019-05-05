import Player from '../models/Player'
import Match from '../models/Match'
import Team from '../models/Team'

import { Error } from 'mongoose'

export const getActiveMatchData = () => {
  return new Promise((resolve, reject) => {
    Match.findOne({ isLive: true }, (err: Error, match: any) => {
      if (err) reject(err)

      if (match === null)
        return reject('No live match configuration active')

      Team.find({'_id': {$in: [
        match.teamA,
        match.teamB
      ]}}, (err: Error, teams: any) => {
        if (err) reject(err)

        Player.find({$or:[ {team: teams[0].teamNameShort},{team: teams[1].teamNameShort} ]}, (err: Error, players: any) => {
          if (err) reject(err)

          resolve({match, teams, players})
        })
      })
    })
  })
}

export const filterActiveMatchData = (data: any) => {
  let teamAPlayers = { }
  let teamBPlayers = { }

  data.players.map(player => {
    const playerData = {
      teamName: player.team,
      firstName: player.firstName,
      lastName: player.lastName,
      gameName: player.gameName,
      country: player.country,
      hasImage: player.hasImage,
      imagePath: player.hasImage ? player.imagePath : null
    }

    if(player.team === data.teams[0].teamNameShort)
      teamAPlayers[player.steam64id] = playerData
    else
      teamBPlayers[player.steam64id] = playerData
  })

  const teamA = {
    team: 'CT',
    customName: data.teams[0].teamNameShort,
    customLogo: data.teams[0].hasLogo ? data.teams[0].logoPath : null,
    country: data.teams[0].country,
    players: teamAPlayers
  }

  const teamB = {
    team: 'T',
    customName: data.teams[1].teamNameShort,
    customLogo: data.teams[1].hasLogo ? data.teams[1].logoPath : null,
    country: data.teams[1].country,
    players: teamBPlayers
  }
  
  return {
    teamA,
    teamB,
    players: { ...teamAPlayers, ...teamBPlayers }
  }
}