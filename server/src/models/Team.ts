import * as mongoose from 'mongoose'
import { TeamSchema } from '../types'

const teamSchema = new mongoose.Schema<TeamSchema>({
  teamNameShort: {
    type: String,
    unique: true,
    required: true
  },
  teamNameLong: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  hasLogo: {
    type: Boolean,
    default: false,
    required: true
  },
  logoPath: {
    type: String,
    required: false,
  }
})

mongoose.model('teams', teamSchema)

export default mongoose.model('teams')
