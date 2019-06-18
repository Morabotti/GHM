import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Countries, Maps, Configs } from '../types'
import { SOCKET } from '../enum'

import { setConfig, getConfig } from '../core/ConfigCore'
import { dispatchSocket } from '../handler/SocketIo'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const fileCountry = './static/config/countries.json'
const fileMaps = './static/config/maps.json'
const fileConfigs = './static/config/configs.json'

router.post('/countries', (req: Request, res: Response) => {
  const countries: Countries = req.body
  setConfig(fileCountry, countries)
    .then(i => res.sendStatus(200))
    .catch(e => res.status(400).send(e))
})

router.get('/countries', (req: Request, res: Response) => {
  getConfig(fileCountry)
    .then(settings => res.status(200).send(settings))
    .catch(e => res.status(500).send(e))
})

router.post('/maps', (req: Request, res: Response) => {
  const maps: Maps = req.body
  setConfig(fileMaps, maps)
    .then(i => res.sendStatus(200))
    .catch(e => res.status(400).send(e))
})

router.get('/maps', (req: Request, res: Response) => {
  getConfig(fileMaps)
    .then(maps => res.status(200).send(maps))
    .catch(e => res.status(500).send(e))
})

router.post('/configs', (req: Request, res: Response) => {
  const configs: Configs = req.body.configs
  setConfig(fileConfigs, configs)
    .then(x => Promise.resolve(dispatchSocket(SOCKET.UPDATE_OVERLAY_CONFIG, configs)))
    .then(c => res.sendStatus(200))
    .catch(e => res.status(404).send(e))
})

router.get('/configs', (req: Request, res: Response) => {
  getConfig(fileConfigs)
    .then(configs => res.status(200).send(configs))
    .catch(e => res.status(500).send(e))
})

export default router
