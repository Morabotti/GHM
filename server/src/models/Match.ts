import * as mongoose from 'mongoose'
import { MatchSchema } from '../types'

const matchSchema = new mongoose.Schema<MatchSchema>({
  teamA: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  teamB: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  isLive: {
    type: Boolean,
    default: false,
    required: false
  }
})

mongoose.model('matches', matchSchema)

export default mongoose.model('matches')
