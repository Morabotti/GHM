import * as mongoose from 'mongoose'
import { MatchModel } from '../types'

const matchSchema = new mongoose.Schema({
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
  },
  format: {
    type: String,
    default: 'bo1',
    required: true
  },
  maps: {
    type: [String],
    required: true
  },
  scoreA: {
    type: Number,
    default: 0,
    required: false
  },
  scoreB: {
    type: Number,
    default: 0,
    required: false
  },
})

export default mongoose.model<MatchModel>('matches', matchSchema)
