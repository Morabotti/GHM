import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  socketIoPort: number,
  gameStateToken: string,
  settingsPath: string,
  gameStateTimeout: number
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080,
  'socketIoPort': Number(process.env.SOCKET_PORT) || 8081,
  'gameStateToken': process.env.TOKEN_SECRET || 'SecretKEY',
  'settingsPath': process.env.SETTINGS_PATH || './static/data/settings.json',
  'gameStateTimeout': Number(process.env.TIMEOUT_TIME) || 15
}

export default config
