import * as mongoose from 'mongoose'
import config from './config'

class DB {
  connection: null | mongoose.Mongoose

  constructor () {
    this.connection = null
  }

  connect = async () => {
    if (config.dbConnection) {
      try {
        this.connection = await mongoose.connect(config.dbConnection, {
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

  getConnection = (): mongoose.Mongoose | null => this.connection
}

/*
const dbConnect = () => {
  if (config.dbConnection !== null) {
    try {
      return mongoose.connect(config.dbConnection, {
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
*/

const db = new DB()

export default db
