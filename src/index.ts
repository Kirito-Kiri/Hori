import Discord from 'discord.js'
import path from 'path'
import { findFilesByType } from './commandHandler'
import { loadConfig } from './utils'
import { loadEvents } from './eventHandler'
import { Command } from './Structure/Command'

const config = loadConfig()

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

loadEvents(client)

const dirName: string = path.join(__dirname, 'commands')
const commandFiles = findFilesByType(dirName, '.js')
for (const file of commandFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cmd = require(file).default
  const instance = new cmd() as Command
  const commandName = instance.name.toLowerCase()
  client.commands.set(commandName, instance)
}

client.login(config.token)
