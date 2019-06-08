import * as express from 'express'
import * as bodyParser from 'body-parser'

import gameState from '../core/GameState'
import gameStats from '../core/GameStats'

import { Request, Response } from 'express'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/update', (req: Request, res: Response) => {
  const data = req.body
  if (data === null) 
    return res
        .status(401)
        .send({message: 'Data not sent'})

  gameState.handleRequest(data)
  return res
      .sendStatus(200)
})

router.get('/online', (req: Request, res: Response) => {
  return res
      .status(200)
      .send(gameState.getCurrentStatus())
})

router.get('/', (req: Request, res: Response) => {
  return res
      .status(200)
      .send(gameState.getGameState())
})

router.get('/overlay/init', (req: Request, res: Response) => {
  const ok = gameState.checkIfHasData()
  
  if (ok) {
    gameState.sendLatestDispatch()
    gameStats.sendLatestDispatch()
    return res
        .status(200)
        .send({message: 'Data was found'})
  } else {
    return res
        .status(404)
        .send({message: 'Data was not found'})
  }
})

export default router
