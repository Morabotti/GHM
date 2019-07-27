
import { TeamModel, TeamSpecific } from '../types'
import { Types, Error } from 'mongoose'

import Team from '../models/Team'
import Player from '../models/Player'
import { deleteFile, getFileExtension, renameFile } from '../utils/files'

interface NewTeam {
  nameShort: TeamModel['nameShort'],
  nameLong: TeamModel['nameLong'],
  country: TeamModel['country'],
  isLogo: TeamModel['hasLogo'],
  path: TeamModel['logoPath']
}

interface UpdateTeam {
  nameShort: TeamModel['nameShort'],
  nameLong: TeamModel['nameLong'],
  country: TeamModel['country'],
  hasLogo: TeamModel['hasLogo']
}

export const createTeam = ({
  nameShort,
  nameLong,
  country,
  isLogo,
  path
}: NewTeam): Promise<TeamModel> => new Promise(
  (resolve, reject) => {
    Team.create({
      nameShort,
      nameLong,
      country,
      hasLogo: isLogo,
      logoPath: isLogo ? path : null
    }, (err: Error, team: TeamModel) => {
      if (err) {
        return reject('There was a problem adding the player to the database.')
      }

      return resolve(team)
    })
  }
)

export const fetchTeams = (): Promise<TeamModel[]> => new Promise(
  (resolve, reject) => {
    Team.find({}, (err: Error, team: TeamModel[]) => {
      if (err) {
        return reject('There was a problem finding the teams.')
      }

      return resolve(team)
    })
  }
)

export const getTeam = (
  id: TeamModel['_id']
): Promise<TeamSpecific> => new Promise(
  (resolve, reject) => {
    Team.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'players',
          localField: 'nameShort',
          foreignField: 'team',
          as: 'player_info'
        }
      },
      {
        $project: {
          _id: 1,
          nameShort: 1,
          nameLong: 1,
          country: 1,
          hasLogo: 1,
          logoPath: 1,
          players: '$player_info'
        }
      },
      { $limit: 1 }
    ]).exec((err: Error, result) => {
      if (err) {
        return reject('There was a problem finding the team.')
      }

      if (!result[0]) {
        return reject('No team found.')
      }

      return resolve(result[0])
    })
  }
)

export const deleteTeam = (
  id: TeamModel['_id']
): Promise<string> => new Promise(
  (resolve, reject) => {
    Team.findByIdAndRemove(id, (err: Error, team: TeamModel | null) => {
      if (err || team === null) {
        return reject('There was a problem deleting the team.')
      }

      Player.deleteMany({ team: team.nameShort }).exec()

      if (team.logoPath !== null) {
        deleteFile(team.logoPath)
          .catch(() => reject(`Team: ${team.nameShort} was deleted, but image was not.`))
      }

      return resolve(`Team: ${team.nameShort} was deleted.`)
    })
  }
)

export const updateTeam = (
  id: TeamModel['_id'],
  { nameLong, nameShort, country, hasLogo }: UpdateTeam
): Promise<TeamModel> => new Promise(
  (resolve, reject) => {
    Team.findById(id, (err: Error, team: TeamModel) => {
      if (err) {
        return reject('There was problem finding old team.')
      }

      const newName = nameShort !== team.nameShort

      const newLogoPath = newName && team.logoPath
        ? `static/uploads/teams/${nameShort}.${getFileExtension(team.logoPath)}`
        : team.logoPath

      console.log(newLogoPath)

      if (!hasLogo && team.hasLogo && team.logoPath) {
        deleteFile(team.logoPath)
          .catch(e => reject(`Failed to delete file, ${e}`))
      }

      if (hasLogo && newLogoPath && team.hasLogo && team.logoPath) {
        console.log(team.logoPath)
        renameFile(team.logoPath, newLogoPath)
          .catch(e => reject(`Failed to rename file, ${e}`))
      }

      if (newName) {
        Player.updateMany(
          { team: team.nameShort },
          { $set: { team: nameShort } },
          { multi: true },
          (err: Error) => {
            if (err) {
              return reject('There was problem replacing players new team')
            }
          })
      }

      Team.findByIdAndUpdate(
        id,
        {
          nameShort,
          nameLong,
          country,
          hasLogo,
          logoPath: hasLogo ? newLogoPath : null
        },
        { new: true },
        (err: Error, newTeam: TeamModel | null) => {
          if (err || newTeam === null) {
            return reject('There was a problem updating the team.')
          }

          return resolve(newTeam)
        })
    })
  }
)

export const updateTeamLogo = (
  id: TeamModel['_id'],
  { nameLong, nameShort, country, isLogo, path }: NewTeam
): Promise<TeamModel> => new Promise(
  (resolve, reject) => {
    Team.findById(id, (err: Error, team: TeamModel) => {
      if (err) {
        return reject('There was problem finding old team')
      }

      if (team.hasLogo && nameShort !== team.nameShort && team.logoPath) {
        deleteFile(team.logoPath)
          .catch(e => reject(`There was problem deleting old image: ${e}`))
      }

      if (nameShort !== team.nameShort) {
        Player.updateMany(
          { team: team.nameShort },
          { $set: { team: nameShort } },
          { multi: true },
          (err: Error) => {
            if (err) {
              return reject('There was problem replacing players new team')
            }
          })
      }
    })

    const newProfile = {
      nameShort,
      nameLong,
      country,
      hasLogo: isLogo,
      logoPath: isLogo ? path : null
    }

    Team.findByIdAndUpdate(
      id,
      newProfile,
      { new: true },
      (err: Error, team: TeamModel | null) => {
        if (err || team === null) {
          return reject('There was a problem updating the team.')
        }

        return resolve(team)
      })
  }
)
