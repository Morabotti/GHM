import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'

import Match from '../models/Match'
import matchCore from '../core/MatchCore'

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

    return res.status(200).send(match)
  })
})

router.post('/live/:id', async (req: Request, res: Response) => {
  try {
    const newMatch = await matchCore._toggleActiveMatch(req.params.id)
    return res.status(200).send(newMatch)
  } catch(e) {
    return res.status(400).send(e)
  }
})

router.get('/overlay', async (req: Request, res: Response) => {
  try {
    const activeData = await matchCore._getActiveMatchData()
    const refactored = matchCore.filterActiveMatchData(activeData)
    return res.status(200).send(refactored)
  } catch(e) {
    return res.status(400).send(e)
  }
})

router.get('/', (req: Request, res: Response) => {
  Match.find({}, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the match.')

    return res.status(200).send(match)
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

    return res.status(200).send(match)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Match.findByIdAndRemove(req.params.id, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem deleting the match.')

    return res.status(200).send(`Match was deleted.`)
  })
})

router.put('/:id',  (req: Request, res: Response) => {
  const { teamA, teamB } = req.body.match

  Match.findByIdAndUpdate(req.params.id, {teamA, teamB}, { new: true }, (err: Error, match: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem updating the match.')

    return res.status(200).send(match)
  })
})

export default router
