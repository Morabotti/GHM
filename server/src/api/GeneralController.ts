import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Countries } from '../types'

import { setCountries, getCountries } from '../core/ConfigureCore'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/countries', (req: Request, res: Response) => {
  const countries: Countries = req.body
  setCountries(countries)
    .then(i => res.sendStatus(200))
    .catch(e => res.status(400).send(e))
})

router.get('/countries', (req: Request, res: Response) => {
  getCountries()
    .then(settings => res.status(200).send(settings))
    .catch(e => res.status(500).send(e))
})

export default router
