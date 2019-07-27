import * as mongoose from 'mongoose'
import { TeamModel } from '../types'

const teamSchema = new mongoose.Schema({
  nameShort: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  nameLong: {
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
    required: false
  }
})

export default mongoose.model<TeamModel>('teams', teamSchema)
