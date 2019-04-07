import * as express from 'express'
import * as bodyParser from 'body-parser'

import config from '../config'
import GameMaster from '../core/GameMaster'

import { Request, Response } from 'express'

const router = express.Router()
const gameMaster = new GameMaster()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/update', (req: Request, res: Response) => {
  const data = req.body
  if(data === null ) { res.sendStatus(401); return}
  gameMaster._handleNewData(data)
  res.sendStatus(200)
})

router.get('/online', (req: Request, res: Response) => {
  res.send(gameMaster._getCurrentStatus())
})

router.get('/', (req, res) => {
  res.send(gameMaster._getLastestGameData())
})

router.get('/overlay/init', (req, res) => {
  const ok = gameMaster._checkIfHasData()
  if(ok) { res.sendStatus(200) }
  else { res.sendStatus(500) }
})

export default router
