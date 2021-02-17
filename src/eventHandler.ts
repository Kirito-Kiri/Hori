import fs from 'fs'
import { join } from 'path'
import { Client } from 'discord.js'

/**
 * Loads events for use
 * @param client instance of Discord.Client
 */
export const loadEvents = (client: Client): void => {
  fs.readdir(join(__dirname, 'events'), (err, files): void => {
    if (err) return console.error(err)
    files.forEach(file => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const event = require(`./events/${file}`)
      // eslint-disable-next-line prefer-const
      let eventName: string = file.split('.')[0]
      client.on(eventName, event.bind(null, client))
    })
  })
}
