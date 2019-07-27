import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'
import { teamLogo } from '../handler/Multer'

import {
  createTeam,
  fetchTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  updateTeamLogo
} from '../core/TeamCore'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', teamLogo.single('logo'), async (req: Request, res: Response) => {
  try {
    const {
      nameShort,
      nameLong,
      hasLogo
    } = req.body
    const isLogo = hasLogo === 'true'
    const country = req.body.country === undefined
      ? 'eu'
      : req.body.country

    const team = await createTeam({
      nameShort,
      nameLong,
      country,
      isLogo,
      path: isLogo ? req.file.path : null
    })

    return res.status(200).send(team)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await fetchTeams()
    res.status(200).send(teams)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await getTeam(req.params.id)
    return res.status(200).send(team)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const message = await deleteTeam(req.params.id)
    return res.status(200).send(message)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const {
      nameShort,
      nameLong,
      country,
      hasLogo
    } = req.body.data

    const team = await updateTeam(
      req.params.id,
      { nameShort, nameLong, country, hasLogo }
    )

    return res.status(200).send(team)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.put('/newlogo/:id', teamLogo.single('logo'), async (req: Request, res: Response) => {
  try {
    const {
      nameShort,
      nameLong,
      hasLogo
    } = req.body
    const isLogo = hasLogo === 'true'
    const country = req.body.country === undefined
      ? 'eu'
      : req.body.country

    const team = await updateTeamLogo(
      req.params.id,
      { nameShort, nameLong, country, isLogo, path: req.file.path }
    )

    return res.status(200).send(team)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

export default router
