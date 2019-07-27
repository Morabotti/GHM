
import { PlayerModel, PlayerSpecific } from '../types'

import Player from '../models/Player'
import { Types, Error } from 'mongoose'
import { deleteFile, getFileExtension, renameFile } from '../utils/files'

interface NewPlayer {
  steam64ID: PlayerModel['steam64ID'],
  firstName: PlayerModel['firstName'],
  lastName: PlayerModel['lastName'],
  gameName: PlayerModel['gameName'],
  country: PlayerModel['country'],
  team: PlayerModel['team'],
  isImage: PlayerModel['hasImage'],
  path: PlayerModel['imagePath']
}

interface UpdatePlayer {
  steam64ID: PlayerModel['steam64ID'],
  firstName: PlayerModel['firstName'],
  lastName: PlayerModel['lastName'],
  gameName: PlayerModel['gameName'],
  country: PlayerModel['country'],
  team: PlayerModel['team'],
  hasImage: PlayerModel['hasImage']
}

interface UpdateImagePlayer {
  steam64ID: PlayerModel['steam64ID'],
  firstName: PlayerModel['firstName'],
  lastName: PlayerModel['lastName'],
  gameName: PlayerModel['gameName'],
  country: PlayerModel['country'],
  team: PlayerModel['team'],
  hasImage: PlayerModel['hasImage'],
  imagePath: PlayerModel['imagePath']
}

export const createPlayer = ({
  steam64ID,
  firstName,
  lastName,
  gameName,
  country,
  team,
  isImage,
  path
}: NewPlayer) => new Promise(
  (resolve, reject) => {
    Player.create({
      steam64ID,
      firstName,
      lastName,
      gameName,
      country,
      team,
      hasImage: isImage,
      imagePath: isImage ? path : null
    }, (err: Error, player: PlayerModel) => {
      if (err) {
        return reject('There was a problem adding the information to the database.')
      }

      return resolve(player)
    })
  }
)

export const fetchPlayers = (): Promise<PlayerModel[]> => new Promise(
  (resolve, reject) => {
    Player.find({}, (err: Error, players: PlayerModel[]) => {
      if (err) {
        return reject('There was a problem finding the teams.')
      }

      return resolve(players)
    })
  }
)

export const getPlayer = (
  id: PlayerModel['_id']
): Promise<PlayerSpecific> => new Promise(
  (resolve, reject) => {
    Player.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'teams',
          localField: 'team',
          foreignField: 'nameShort',
          as: 'team_info'
        }
      },
      { $unwind: '$team_info' },
      {
        $project: {
          _id: 1,
          steam64ID: 1,
          firstName: 1,
          lastName: 1,
          gameName: 1,
          country: 1,
          team: '$team_info',
          hasImage: 1,
          imagePath: 1
        }
      },
      { $limit: 1 }
    ]).exec((err: Error, player) => {
      if (err) {
        return reject('There was a problem finding the player.')
      }

      if (!player[0]) {
        return reject('No player found.')
      }

      return resolve(player[0])
    })
  }
)

export const deletePlayer = (
  id: PlayerModel['_id']
): Promise<string> => new Promise(
  (resolve, reject) => {
    Player.findByIdAndRemove(id, (err: Error, player: PlayerModel | null) => {
      if (err || player === null) {
        return reject('There was a problem deleting the player.')
      }

      if (player.imagePath !== null) {
        deleteFile(player.imagePath)
          .catch(e => reject(`Team: ${player.gameName} was deleted, but image was not: ${e}`)
          )
      }

      return resolve(`Player: ${player.gameName} was deleted.`)
    })
  }
)

export const updatePlayer = (
  id: PlayerModel['_id'],
  { firstName, gameName, lastName, country, steam64ID, hasImage, team }: UpdatePlayer
): Promise<PlayerModel> => new Promise(
  (resolve, reject) => {
    Player.findById(id, (err: Error, player: PlayerModel) => {
      if (err) {
        return reject('There was a problem finding the player.')
      }

      const imgRename = (gameName !== player.gameName || steam64ID !== player.steam64ID)
      const imgPath = (imgRename && player.hasImage && player.imagePath)
        ? `static/uploads/players/${gameName}_${steam64ID}.${getFileExtension(player.imagePath)}`
        : player.imagePath

      if (!hasImage && player.hasImage && player.imagePath) {
        deleteFile(player.imagePath)
          .catch(e => console.log(e))
      }

      // TODO: Storage leak => If new image & only gamename changed. image doesnt get deleted or renamed
      if (imgRename && hasImage && player.hasImage && player.imagePath && imgPath) {
        renameFile(player.imagePath, imgPath)
          .catch(e => console.log(e))
      }

      Player.findByIdAndUpdate(
        id,
        {
          steam64ID,
          firstName,
          lastName,
          gameName,
          country,
          team,
          hasImage,
          imagePath: hasImage ? imgPath : null
        },
        { new: true },
        (err: Error, player: PlayerModel | null) => {
          if (err || player === null) {
            return reject('There was a problem updating the player.')
          }

          return resolve(player)
        }
      )
    })
  }
)

export const updatePlayerImage = (
  id: PlayerModel['_id'],
  newPlayer: UpdateImagePlayer
): Promise<PlayerModel> => new Promise(
  (resolve, reject) => {
    Player.findById(id, (err: Error, player: PlayerModel) => {
      if (err) {
        return reject('There was problem finding old player.')
      }

      if (
        player.hasImage && player.imagePath
        && (newPlayer.gameName !== player.gameName || newPlayer.steam64ID !== player.steam64ID)
      ) {
        deleteFile(player.imagePath)
          .catch(e => reject(`There was problem deleting old image: ${e}`))
      }
    })

    Player.findByIdAndUpdate(id, newPlayer, { new: true }, (err: Error, player: PlayerModel | null) => {
      if (err || player === null) {
        return reject('There was a problem updating the player.')
      }

      return resolve(player)
    })
  }
)
