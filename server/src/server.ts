import app from './app'
import config from './config'
import dbConnect from './db'

app.listen(config.port, async () => {
  await dbConnect()
  console.log(`Server listening on port ${config.port}`)
})
