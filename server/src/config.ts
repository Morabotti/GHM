import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  socketIoPort: number,
  gameStateToken: string,
  settingsPath: string,
  gameStateTimeout: number,
  steamApiKey: string,
  dbConnection: string | null
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080,
  'socketIoPort': Number(process.env.SOCKET_PORT) || 8081,
  'gameStateToken': process.env.TOKEN_SECRET || 'SecretKEY',
  'settingsPath': process.env.SETTINGS_PATH || './static/data/settings.json',
  'gameStateTimeout': Number(process.env.TIMEOUT_TIME) || 15,
  'steamApiKey': process.env.STEAM_API_KEY || '',
  'dbConnection': process.env.DB_CONNECTION || null,
}

export default config
