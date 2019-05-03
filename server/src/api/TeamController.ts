import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'
import { ListElement, TeamSchema } from '../types'

import { uploadTeamsLogo } from '../handler/Multer'
import Team from '../models/Team'
import Player from '../models/Player'
import { deleteFile, getFileExtension, renameFile } from '../utils/files'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', uploadTeamsLogo.single('logo'), (req: Request, res: Response) => {
  const { teamNameShort, teamNameLong, hasLogo, } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isLogo = hasLogo === 'true'
  
  Team.create({
    teamNameShort,
    teamNameLong,
    country,
    hasLogo: isLogo,
    logoPath: isLogo ? req.file.path : null
  }, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem adding the information to the database.')

    return res.status(200).send(team)
  })
})

router.get('/', (req: Request, res: Response) => {
  Team.find({}, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')

    return res.status(200).send(team)
  })
})

router.get('/dropdown', (req: Request, res: Response) => {
  Team.find({}, (err: Error, teams: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')
      
    let newArray:Array<ListElement> = []

    teams.forEach((team: TeamSchema) => {
      newArray = [
        ...newArray,
        {
          key: team.teamNameShort,
          value: team.teamNameShort,
          text: team.teamNameLong,
          image: { avatar: true, src: `/${team.logoPath === null ? 'static/default/default-team.png' : team.logoPath}` }
        }
      ]
    });

    return res.status(200).send(newArray)
  })
})

router.get('/:id', (req: Request, res: Response) => {
  Team.findById(req.params.id, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')

    if (!team) return res
        .status(404)
        .send('No team found.')

    return res.status(200).send(team)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Team.findByIdAndRemove(req.params.id, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem deleting the team.')
    
    Player.deleteMany({team: team.teamNameShort}).exec()
    
    if (team.logoPath !== null)
      deleteFile(team.logoPath)
        .catch(e => res
          .status(500)
          .send(`Team: ${team.teamNameShort} was deleted, but image was not.`))

    return res.status(200).send(`Team: ${team.teamNameShort} was deleted.`)
  })
})

/*
 ! FIX WHEN USER HAS PUT CHECKBOX (hasLogo) TRUE
 */
router.put('/:id', (req: Request, res: Response) => {
  const {
    teamNameShort,
    teamNameLong,
    country,
    hasLogo
  } = req.body.data
  
  Team.findById(req.params.id, (err: Error, team: any) => {
    if (err) return res
        .status(400)
        .send('There was problem finding old team.')

    const newName = teamNameShort !== team.teamNameShort

    const newLogoPath = newName
      ? `static/uploads/teams/${teamNameShort}.${getFileExtension(team.logoPath)}`
      : team.logoPath

    if (!hasLogo && team.hasLogo)
      deleteFile(team.logoPath)
        .catch(e => console.log(e))

    if(hasLogo && newLogoPath && team.hasLogo)
      renameFile(team.logoPath, newLogoPath)
        .catch(e => console.log(e))

    if (newName) {
      Player.updateMany(
        {team: team.teamNameShort},
        {$set: {team: teamNameShort}},
        {multi: true},
        (err: Error, player: any) => {
          if (err) return res
              .status(400)
              .send('There was problem replacing players new team')
        })
    }

    Team.findByIdAndUpdate(
      req.params.id,
      {
        teamNameShort, teamNameLong, 
        country, hasLogo,
        logoPath: hasLogo ? newLogoPath : null
      },
      { new: true },
      (err: Error, newTeam: any) => {
      if (err) return res
          .status(500)
          .send('There was a problem updating the team.')

      return res.status(200).send(newTeam)
    })
  })
  
})

router.put('/newlogo/:id', uploadTeamsLogo.single('logo'),  (req: Request, res: Response) => {
  const { teamNameShort, teamNameLong, hasLogo, } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isLogo = hasLogo === 'true'

  Team.findById(req.params.id, (err: Error, team: any) => {
    if (err) return res
        .status(400)
        .send('There was problem finding old team.')


    if(team.hasLogo && (teamNameShort !== team.teamNameShort))
      deleteFile(team.logoPath)
        .catch(e => console.log(e))

    if (teamNameShort !== team.teamNameShort)
      Player.updateMany(
        {team: team.teamNameShort},
        {$set: {team: teamNameShort}},
        {multi: true},
        (err: Error, player: any) => {
          if (err) return res
              .status(400)
              .send('There was problem replacing players new team')
        })
  })

  const newProfile = {
    teamNameShort: teamNameShort,
    teamNameLong: teamNameLong,
    country: country,
    hasLogo: isLogo,
    logoPath: isLogo ? req.file.path : null
  }

  Team.findByIdAndUpdate(req.params.id, newProfile, { new: true }, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem updating the team.')

    return res.status(200).send(team)
  })
})

export default router