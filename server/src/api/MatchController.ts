import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error, Types } from 'mongoose'

import Match from '../models/Match'
import matchCore from '../core/MatchCore'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', (req: Request, res: Response) => {
  const { teamA, teamB } = req.body

  Match.create({
    teamA: teamA._id,
    teamB: teamB._id,
  }, (err: Error, match: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem adding the information to the database.')
    }

    const id = match._id

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
        $project:{
          _id : 1,
          teamA: '$teamA',
          teamB: '$teamB',
          isLive: 1
        }
      },
      { $limit: 1 }
    ])
      .exec((err: Error, match: any) => {
        if (err) {
          return res
            .status(404)
            .send('There was problem returning match.')
        }

        if (match[0] === undefined) {
          return res
            .status(500)
            .send('Query Error.')
        }

        res.status(200).send(match[0])
      })
  })
})

router.post('/live/:id', async (req: Request, res: Response) => {
  try {
    const newMatch: any = await matchCore._toggleActiveMatch(req.params.id)
    Match.aggregate([
      { $match: { _id: Types.ObjectId(newMatch.id) } },
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
        $project:{
          _id : 1,
          teamA: '$teamA',
          teamB: '$teamB',
          isLive: 1
        }
      },
      { $limit: 1 }
    ])
      .exec((err: Error, match: any) => {
        if (err) {
          return res
            .status(404)
            .send('There was problem finding match.')
        }

        if (match[0] === undefined) {
          return res
            .status(200)
            .send(null)
        }

        res.status(200).send(match[0])
      })
  }
  catch (e) {
    return res.status(400).send(e)
  }
})

router.get('/live', async (req: Request, res: Response) => {
  await matchCore.dispatchActive()
  res.sendStatus(200)
})

router.get('/active', async (req: Request, res: Response) => {
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
          { $match: { $expr: { $eq: ['$team', '$$teamBName'] }}},
          { $project: { _id: 0 } }
        ],
        as: 'teamBPlayers'
      }
    },
    {
      $project: {
        _id : 1,
        teamA: '$teamA',
        teamB: '$teamB',
        teamAPlayers: '$teamAPlayers',
        teamBPlayers: '$teamBPlayers',
        isLive: 1
      }
    },
    { $limit: 1 }
  ])
    .exec((err: Error, match: any) => {
      if (err) {
        return res
          .status(404)
          .send('There was problem finding match.')
      }

      if (match[0] === undefined) {
        return res
          .status(200)
          .send(null)
      }

      res.status(200).send(match[0])
    })
})

router.get('/match', async (req: Request, res: Response) => {
  try {
    const activeData = await matchCore._getActiveMatchData()
    const refactored = matchCore.filterActiveMatchData(activeData)
    return res.status(200).send(refactored)
  }
  catch (e) {
    return res.status(404).send(e)
  }
})

router.get('/', (req: Request, res: Response) => {
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
      $project:{
        _id : 1,
        teamA: '$teamA',
        teamB: '$teamB',
        isLive: 1
      }
    },
  ])
    .exec((err: Error, match: any) => {
      if (err) {
        return res
          .status(404)
          .send('There was problem finding matches.')
      }
      res.status(200).send(match)
    })
})

router.get('/:id', (req: Request, res: Response) => {
  Match.findById(req.params.id, (err: Error, match: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the match.')
    }

    if (!match) {
      return res
        .status(404)
        .send('No match found.')
    }

    return res.status(200).send(match)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Match.findByIdAndRemove(req.params.id, (err: Error, match: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem deleting the match.')
    }

    return res.status(200).send(`Match was deleted.`)
  })
})

router.put('/:id', (req: Request, res: Response) => {
  const { teamA, teamB } = req.body

  Match.findByIdAndUpdate(req.params.id, { teamA, teamB }, { new: true }, (err: Error, match: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem updating the match.')
    }

    return res.status(200).send(match)
  })
})

export default router
