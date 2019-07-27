import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'
import { SOCKET } from '../enum'

import { setConfig, getConfig } from '../core/ConfigCore'
import { dispatchSocket } from '../handler/SocketIo'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const fileConfigs = './static/config/configs.json'

router.post('/configs', (req: Request, res: Response) => {
  const configs = req.body.configs
  setConfig(fileConfigs, configs)
    .then(() => Promise.resolve(dispatchSocket(SOCKET.UPDATE_OVERLAY_CONFIG, configs)))
    .then(() => res.sendStatus(200))
    .catch(e => res.status(404).send(e))
})

router.get('/configs', (req: Request, res: Response) => {
  getConfig(fileConfigs)
    .then(configs => res.status(200).send(configs))
    .catch(e => res.status(500).send(e))
})

export default router
