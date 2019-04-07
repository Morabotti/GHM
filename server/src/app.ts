import * as express from 'express'
import * as path from 'path'

import gameStateController from './api/GameState'

const app: express.Application = express()

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'static')))

export default app
