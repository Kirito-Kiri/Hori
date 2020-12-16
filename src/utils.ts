import fs from 'fs'
import path from 'path'
interface BotConfig {
  prefix: string
  token: string
  owner: string
}
/**
 * Export config.json properties
 */
export const loadConfig = () => {
  const file = fs.readFileSync(path.join(__dirname, '..', 'config.json'), { encoding: 'utf8' })
  return JSON.parse(file) as BotConfig
}
