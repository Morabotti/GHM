import * as bodyParser from 'body-parser'

import { Request, Response, Router } from 'express'
import { playerImage } from '../handler/Multer'

import {
  createPlayer,
  fetchPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
  updatePlayerImage
} from '../core/PlayerCore'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', playerImage.single('image'), async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      gameName,
      steam64ID,
      team,
      hasImage
    } = req.body
    const isImage = hasImage === 'true'
    const country = req.body.country === undefined
      ? 'eu'
      : req.body.country

    const player = await createPlayer({
      firstName,
      lastName,
      gameName,
      steam64ID,
      team,
      country,
      isImage,
      path: isImage && req.file ? req.file.path : null
    })

    return res.status(200).send(player)
  }
  catch (e) {
    return res.status(500).send(e)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const players = await fetchPlayers()
    return res.status(200).send(players)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await getPlayer(req.params.id)
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
    const message = await deletePlayer(req.params.id)
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
      steam64ID,
      firstName,
      lastName,
      gameName,
      country,
      team,
      hasImage
    } = req.body.data

    const player = await updatePlayer(req.params.id, {
      steam64ID,
      firstName,
      lastName,
      gameName,
      country,
      team,
      hasImage
    })

    return res.status(200).send(player)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.put('/newimg/:id', playerImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, gameName, steam64ID, team, hasImage } = req.body
    const country = req.body.country === undefined ? 'eu' : req.body.country
    const isImage = hasImage === 'true'

    const newPlayer = await updatePlayerImage(req.params.id, {
      steam64ID,
      firstName,
      lastName,
      gameName,
      country,
      team,
      hasImage: isImage,
      imagePath: isImage && req.file ? req.file.path : null
    })

    return res.status(200).send(newPlayer)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

export default router
