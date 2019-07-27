import * as express from 'express'
import * as path from 'path'

import { Request, Response, Application } from 'express'

import {
  GameStateController,
  PlayerController,
  TeamController,
  GeneralController,
  MatchController
} from './api/'

const app: Application = express()

app.use(express.json())
app.use(express.static('../client/build'))

app.use('/api/game', GameStateController)
app.use('/api/players', PlayerController)
app.use('/api/teams', TeamController)
app.use('/api/general', GeneralController)
app.use('/api/matches', MatchController)

app.use('/static', express.static(path.join(__dirname, '../static')))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})

export default app
