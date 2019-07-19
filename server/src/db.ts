import * as mongoose from 'mongoose'
import config from './config'

const dbConnect = () => {
  if (config.dbConnection !== null) {
    try {
      mongoose.connect(config.dbConnection, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
    }
    catch (e) {
      console.log('Wrong mongoDB string, Could not be accessed')
    }
  }
  else {
    console.log('Cannot access to mongoDB. DB connection string is not set.')
  }
}

export default dbConnect
