import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'
import { Error } from 'mongoose'

import { uploadPlayerImages } from '../handler/Multer'
import Player from '../models/Player'
import { deleteFile, getFileExtension, renameFile } from '../utils/files'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', uploadPlayerImages.single('image'), (req: Request, res: Response) => {
  const { firstName, lastName, gameName, steam64id, team, hasImage } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isImage = hasImage === 'true'

  Player.create({
    steam64id: steam64id,
    firstName: firstName,
    lastName: lastName,
    gameName: gameName,
    country: country,
    team: team,
    hasImage: isImage,
    imagePath: isImage ? req.file.path : null
  }, (err: Error, player: any) => {
    if (err) {
      console.log(err)
      return res
        .status(500)
        .send('There was a problem adding the information to the database.')
    }

    return res.status(200).send(player)
  })
})

router.get('/', (req: Request, res: Response) => {
  Player.find({}, (err: Error, player: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the players.')
    }

    return res.status(200).send(player)
  })
})

router.get('/:id', (req: Request, res: Response) => {
  Player.findById(req.params.id, (err: Error, player: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the player.')
    }

    if (!player) {
      return res
        .status(404)
        .send('No player found.')
    }

    return res.status(200).send(player)
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  Player.findByIdAndRemove(req.params.id, (err: Error, player: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem deleting the player.')
    }

    if (player.imagePath !== null) {
      deleteFile(player.imagePath)
        .catch(e => res
          .status(500)
          .send(`Team: ${player.gameName} was deleted, but image was not.`))
    }

    return res.status(200).send(`Player: ${player.gameName} was deleted.`)
  })
})

/*
 ! FIX WHEN USER HAS PUT CHECKBOX (hasImage) TRUE
 */
router.put('/:id', (req: Request, res: Response) => {
  const {
    steam64id,
    firstName,
    lastName,
    gameName,
    country,
    team,
    hasImage
  } = req.body.data

  Player.findById(req.params.id, (err: Error, player: any) => {
    if (err) {
      return res
        .status(400)
        .send('There was a problem finding the player.')
    }

    const imgRename = (gameName !== player.gameName || steam64id !== player.steam64id)
    const imgPath = (imgRename && player.hasImage)
      ? `static/uploads/players/${gameName}_${steam64id}.${getFileExtension(player.imagePath)}`
      : player.imagePath

    if (!hasImage && player.hasImage) {
      deleteFile(player.imagePath)
        .catch(e => console.log(e))
    }

    if (imgRename && hasImage && player.hasImage) {
      renameFile(player.imagePath, imgPath)
        .catch(e => console.log(e))
    }

    Player.findByIdAndUpdate(
      req.params.id,
      {
        steam64id,
        firstName,
        lastName,
        gameName,
        country,
        team,
        hasImage,
        imagePath: hasImage ? imgPath : null
      },
      { new: true },
      (err: Error, player: any) => {
        if (err) {
          return res
            .status(500)
            .send('There was a problem updating the player.')
        }

        return res.status(200).send(player)
      })
  })
})

router.put('/newimg/:id', uploadPlayerImages.single('image'), (req: Request, res: Response) => {
  const { firstName, lastName, gameName, steam64id, team, hasImage } = req.body
  const country = req.body.country === undefined ? 'eu' : req.body.country
  const isImage = hasImage === 'true'

  Player.findById(req.params.id, (err: Error, player: any) => {
    if (err) {
      return res
        .status(400)
        .send('There was problem finding old player.')
    }

    if (player.hasImage && (gameName !== player.gameName || steam64id !== player.steam64id)) {
      deleteFile(player.imagePath)
        .catch(e => console.log(e))
    }
  })

  const newProfile = {
    steam64id: steam64id,
    firstName: firstName,
    lastName: lastName,
    gameName: gameName,
    country: country,
    team: team,
    hasImage: isImage,
    imagePath: isImage ? req.file.path : null
  }

  Player.findByIdAndUpdate(req.params.id, newProfile, { new: true }, (err: Error, player: any) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem updating the player.')
    }

    return res.status(200).send(player)
  })
})

export default router
