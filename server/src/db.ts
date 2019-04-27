import * as mongoose from 'mongoose'
import config from './config'

const dbConnect = () => {
  if (config.dbConnection !== null) {
    mongoose.connect(config.dbConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } else {
    console.log('Cannot access to mongoDB. DB connection string is wrong.')
  }
}

export default dbConnect