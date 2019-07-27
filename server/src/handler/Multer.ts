import * as multer from 'multer'
import { Request } from 'express'
import { getFileExtension } from '../utils/files'

// * TEAMS
const storageTeams = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads/teams/')
  },
  filename: function (req: Request, file, cb) {
    switch (getFileExtension(file.originalname)) {
      case 'png':
        cb(null, `${req.body.nameShort}.png`)
        break
      case 'svg':
        cb(null, `${req.body.nameShort}.svg`)
        break
      case 'jpeg':
        cb(null, `${req.body.nameShort}.jpeg`)
        break
      default:
        cb(null, `${req.body.nameShort}.png`)
    }
  }
})

const fileFilterTeams = (req: Request, file, cb) => {
  const logo = req.body.hasLogo
  if (logo === 'true' || logo === 'false') {
    const hasLogo = JSON.parse(logo)
    if (hasLogo) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') {
        cb(null, true)
      }
      else {
        cb(null, false)
      }
    }
    else {
      cb(null, false)
    }
  }
}

// * PLAYERS
const storagePlayers = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads/players/')
  },
  filename: function (req: Request, file, cb) {
    switch (getFileExtension(file.originalname)) {
      case 'png':
        cb(null, `${req.body.gameName}_${req.body.steam64ID}.png`)
        break
      case 'jpeg':
        cb(null, `${req.body.gameName}_${req.body.steam64ID}.jpeg`)
        break
      default:
        cb(null, `${req.body.gameName}_${req.body.steam64ID}.png`)
    }
  }
})

const fileFilterPlayers = (req: Request, file, cb) => {
  const image = req.body.hasImage
  const steam64ID = req.body.steam64ID
  if (image === 'true' || image === 'false' || steam64ID !== undefined) {
    const hasImage = JSON.parse(image)
    if (hasImage) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
      }
      else {
        cb(null, false)
      }
    }
    else {
      cb(null, false)
    }
  }
}

// * METHODS
export const teamLogo = multer({
  storage: storageTeams,
  fileFilter: fileFilterTeams,
  limits: { fileSize: 1024 * 1024 }
})

export const playerImage = multer({
  storage: storagePlayers,
  fileFilter: fileFilterPlayers,
  limits: { fileSize: 1024 * 1024 * 5 }
})
