import * as express from 'express'
import * as path from 'path'

import GameStateController from './api/GameState'

const app: express.Application = express()

app.use(express.static('../client/build'));
app.use(express.json())

app.use('/api/game', GameStateController)
app.use('/static', express.static(path.join(__dirname, '../static')))

export default app
