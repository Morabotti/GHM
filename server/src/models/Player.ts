import * as mongoose from 'mongoose'
import { PlayerModel } from '../types'

const playerSchema = new mongoose.Schema({
  steam64ID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  gameName: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  team: {
    type: String,
    required: true
  },
  hasImage: {
    type: Boolean,
    default: false,
    required: true
  },
  imagePath: {
    type: String,
    required: false
  }
})

export default mongoose.model<PlayerModel>('players', playerSchema)
