import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error, Document, Types } from 'mongoose'
import db from '../db'
import { ListElement, TeamSchema } from '../types'

import { uploadTeamsLogo } from '../handler/Multer'
import Team from '../models/Team'
import Player from '../models/Player'
import { deleteFile, getFileExtension, renameFile } from '../utils/files'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', uploadTeamsLogo.single('logo'), (req: Request, res: Response) => {
  const { nameShort, nameLong, hasLogo } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isLogo = hasLogo === 'true'

  Team.create({
    nameShort,
    nameLong,
    country,
    hasLogo: isLogo,
    logoPath: isLogo ? req.file.path : null
  }, (err: Error, team: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem adding the information to the database.')
    }

    return res.status(200).send(team)
  })
})

router.get('/', (req: Request, res: Response) => {
  Team.find({}, (err: Error, team: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the team.')
    }

    return res.status(200).send(team)
  })
})

router.get('/:id', async (req: Request, res: Response) => {
  Team.aggregate([
    { $match: { _id: Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: 'players',
        localField: 'nameShort',
        foreignField: 'team',
        as: 'player_info'
      }
    },
    {
      $project:{
        _id : 1,
        nameShort: 1,
        nameLong: 1,
        country: 1,
        hasLogo: 1,
        logoPath: 1,
        players: '$player_info',
      }
    },
    { $limit: 1 }
  ]).exec((err: Error, result) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the team.')
    }

    if (!result[0]) {
      return res
        .status(404)
        .send('No team found.')
    }

    return res.status(200).send(result[0])
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Team.findByIdAndRemove(req.params.id, (err: Error, team: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem deleting the team.')
    }

    // TODO GET THIS WORKING
    Player.deleteMany({ team: team.nameShort }).exec()

    if (team.logoPath !== null) {
      deleteFile(team.logoPath)
        .catch(e => res
          .status(500)
          .send(`Team: ${team.teamNameShort} was deleted, but image was not.`))
    }

    return res.status(200).send(`Team: ${team.teamNameShort} was deleted.`)
  })
})

router.put('/:id', (req: Request, res: Response) => {
  const {
    nameShort,
    nameLong,
    country,
    hasLogo
  } = req.body.data

  Team.findById(req.params.id, (err: Error, team: any) => {
    if (err) {
      return res
        .status(400)
        .send('There was problem finding old team.')
    }

    const newName = nameShort !== team.nameShort

    const newLogoPath = newName
      ? `static/uploads/teams/${nameShort}.${getFileExtension(team.logoPath)}`
      : team.logoPath

    if (!hasLogo && team.hasLogo) {
      deleteFile(team.logoPath)
        .catch(e => console.log(e))
    }

    if (hasLogo && newLogoPath && team.hasLogo) {
      renameFile(team.logoPath, newLogoPath)
        .catch(e => console.log(e))
    }

    if (newName) {
      Player.updateMany(
        { team: team.nameShort },
        { $set: { team: nameShort } },
        { multi: true },
        (err: Error, player: any) => {
          if (err) {
            return res
              .status(400)
              .send('There was problem replacing players new team')
          }
        })
    }

    Team.findByIdAndUpdate(
      req.params.id,
      {
        nameShort,
        nameLong,
        country,
        hasLogo,
        logoPath: hasLogo ? newLogoPath : null
      },
      { new: true },
      (err: Error, newTeam: any) => {
        if (err) {
          return res
            .status(500)
            .send('There was a problem updating the team.')
        }

        return res.status(200).send(newTeam)
      })
  })
})

router.put('/newlogo/:id', uploadTeamsLogo.single('logo'), (req: Request, res: Response) => {
  const { nameShort, nameLong, hasLogo } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isLogo = hasLogo === 'true'

  Team.findById(req.params.id, (err: Error, team: any) => {
    if (err) {
      return res
        .status(400)
        .send('There was problem finding old team.')
    }

    if (team.hasLogo && (nameShort !== team.nameShort)) {
      deleteFile(team.logoPath)
        .catch(e => console.log(e))
    }

    if (nameShort !== team.nameShort) {
      Player.updateMany(
        { team: team.nameShort },
        { $set: { team: nameShort } },
        { multi: true },
        (err: Error, player: any) => {
          if (err) {
            return res
              .status(400)
              .send('There was problem replacing players new team')
          }
        })
    }
  })

  const newProfile = {
    nameShort,
    nameLong,
    country,
    hasLogo: isLogo,
    logoPath: isLogo ? req.file.path : null
  }

  Team.findByIdAndUpdate(req.params.id, newProfile, { new: true }, (err: Error, team: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem updating the team.')
    }

    return res.status(200).send(team)
  })
})

export default router
