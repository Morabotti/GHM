import * as mongoose from 'mongoose'
import { PlayerSchema } from '../types'

const playerSchema = new mongoose.Schema<PlayerSchema>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: false
  },
  steam64id: {
    type: String,
    required: true,
    unique: true
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
  },
})

mongoose.model('players', playerSchema)

export default mongoose.model('players')