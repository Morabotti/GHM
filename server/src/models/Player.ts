import * as mongoose from 'mongoose'
import { PlayerSchema } from '../types'

const playerSchema = new mongoose.Schema<PlayerSchema>({
  steam64id: {
    type: String,
    required: true,
    unique: true
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
  },
})

mongoose.model('players', playerSchema)

export default mongoose.model('players')
