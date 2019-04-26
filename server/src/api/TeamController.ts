import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'

import { uploadTeamsLogo } from '../handler/Multer'
import Team from '../models/Team'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', uploadTeamsLogo.single('logo'), (req: Request, res: Response) => {
  const { teamNameShort, teamNameLong, hasLogo } = req.body
  const country = req.body.country === undefined ? 'un' : req.body.country
  const isLogo = JSON.parse(hasLogo)
  
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
  Team.find({}, { password: 0 }, (err: Error, team: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the team.')

    res.status(200).send(team)
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

    res.status(200).send(`Team: ${team.gameName} was deleted.`)
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