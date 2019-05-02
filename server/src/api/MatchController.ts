import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'

import Match from '../models/Match';

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', (req: Request, res: Response) => {
  const { teamA, teamB } = req.body.match

  Match.create({
    teamA,
    teamB
  }, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem adding the information to the database.')

    res.status(200).send(match)
  })
})

router.post('/live/:id', (req: Request, res: Response) => {
  Match.findById(req.params.id, (err: Error, match: any) => {
    if (err) return res
          .status(400)
          .send('There was a problem finding the match.')

    if (match.isLive) {
      Match.findByIdAndUpdate(
        req.params.id,
        {$set: {isLive: false}},
        (err: Error, newMatch: any) => {
          if (err) return res
              .status(400)
              .send('There was a problem updating the match.')

          res.status(200).send(newMatch)
      })
    } else {
      Match.updateMany(
        {isLive: true},
        {$set: {isLive: false}},
        {multi: true},
        (err: Error, match: any) => {
          if (err) return res
              .status(400)
              .send('There was problem replacing players new team')
  
          Match.findByIdAndUpdate(
            req.params.id,
            {$set: {isLive: true}},
            { new: true },
            (err: Error, newMatch: any) => {
            if (err) return res
                .status(500)
                .send('There was a problem updating the match.')

            res.status(200).send(newMatch)
        })
      })
    }
  })
})

router.get('/', (req: Request, res: Response) => {
  Match.find({}, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the match.')

    res.status(200).send(match)
  })
})

router.get('/:id', (req: Request, res: Response) => {
  Match.findById(req.params.id, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the match.')

    if (!match) return res
        .status(404)
        .send('No match found.')

    res.status(200).send(match)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Match.findByIdAndRemove(req.params.id, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem deleting the match.')

    res.status(200).send(`Match was deleted.`)
  })
})

router.put('/:id',  (req: Request, res: Response) => {
  const { teamA, teamB } = req.body.match

  Match.findByIdAndUpdate(req.params.id, {teamA, teamB}, { new: true }, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem updating the match.')

    res.status(200).send(match)
  })
})

export default router
