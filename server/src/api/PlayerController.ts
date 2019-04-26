import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'

import { uploadPlayerImages } from '../handler/Multer'
import Player from '../models/Player'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', uploadPlayerImages.single('image'), (req: Request, res: Response) => {
  const { firstName, lastName, gameName, steam64id, team, hasImage } = req.body
  const country = req.body.country === undefined ? 'un' : req.body.country
  const isImage = JSON.parse(hasImage)

  Player.create({
    firstName,
    lastName,
    gameName,
    country,
    steam64id,
    team,
    hasImage: isImage,
    imagePath: isImage ? req.file.path : null
  }, (err: Error, player: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem adding the information to the database.')

    res.status(200).send(player)
  })
})

router.get('/', (req: Request, res: Response) => {
  Player.find({}, { password: 0 }, (err: Error, player: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem finding the players.')

    res.status(200).send(player)
  })
})

router.get('/:id', (req: Request, res: Response) => {
  Player.findById(req.params.id, function (err: Error, player: any) {
    if (err) return res
        .status(500)
        .send('There was a problem finding the player.')

    if (!player) return res
        .status(404)
        .send('No player found.')

    res.status(200).send(player)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Player.findByIdAndRemove(req.params.id, (err: Error, player: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem deleting the player.')

    res.status(200).send(`Player: ${player.gameName} was deleted.`)
  })
})

router.put('/:id', (req: Request, res: Response) => {
  Player.findByIdAndUpdate(req.params.id, req.body.player, { new: true }, (err: Error, player: any) => {
    if (err) return res
        .status(500)
        .send('There was a problem updating the player.')

    res.status(200).send(player)
  })
})

export default router