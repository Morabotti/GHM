import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  gameStateToken: string,
  settingsPath: string,
  gameStateTimeout: number
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080,
  'gameStateToken': process.env.TOKEN_SECRET || 'secret',
  'settingsPath': process.env.SETTINGS_PATH || './static/data/settings.json',
  'gameStateTimeout': Number(process.env.TIMEOUT_TIME) || 15
}

export default config