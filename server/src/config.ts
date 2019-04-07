import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  gameStateToken: string
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080,
  'gameStateToken': process.env.TOKEN_SECRET || 'secret'
}

export default config