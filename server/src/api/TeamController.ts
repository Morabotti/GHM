import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'
import { ListElement, TeamSchema } from '../types'

import { uploadTeamsLogo } from '../handler/Multer'
import Team from '../models/Team'
import Player from '../models/Player'
import { deleteFile } from '../utils/files';

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

    res.status(200).send(team)
  })
})

router.get('/', (req: Request, res: Response) => {
  Team.find({}, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')

    res.status(200).send(team)
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

    res.status(200).send(newArray)
  })
})

router.get('/:id', (req: Request, res: Response) => {
  Team.findById(req.params.id, function (err: Error, team: any) {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')

    if (!team) return res
        .status(404)
        .send('No team found.')

    res.status(200).send(team)
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

    res.status(200).send(`Team: ${team.teamNameShort} was deleted.`)
  })
})

router.put('/:id', (req: Request, res: Response) => {
  Team.findByIdAndUpdate(req.params.id, req.body.team, { new: true }, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem updating the team.')

    res.status(200).send(team)
  })
})

export default router