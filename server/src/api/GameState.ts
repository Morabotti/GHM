import * as express from 'express'
import * as bodyParser from 'body-parser'

import gameEvents from '../core/GameEvents'

import { Request, Response } from 'express'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/update', (req: Request, res: Response) => {
  const data = req.body
  if (data === null) {
    res.status(401).send({message: 'Data not sent'})
    return
  }
  gameEvents.handleRequest(data)
  res.sendStatus(200)
})

router.get('/online', (req: Request, res: Response) => {
  res.send(gameEvents.getCurrentStatus())
})

router.get('/', (req: Request, res: Response) => {
  res.status(200).send(gameEvents.getGameState())
})

router.get('/overlay/init', (req: Request, res: Response) => {
  const ok = gameEvents.checkIfHasData()
  
  if (ok) {
    gameEvents.sendLatestDispatch()
    res.status(200).send({message: 'Data was found'})
  } else {
    res.status(400).send({message: 'Data was not found'})
  }
})

export default router
