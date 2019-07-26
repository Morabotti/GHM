import app from './app'
import config from './config'
import db from './db'

app.listen(config.port, async () => {
  await db.connect()
  console.log(`Server listening on port ${config.port}`)
})
