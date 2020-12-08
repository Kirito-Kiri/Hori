import Discord from 'discord.js'
import { loadConfig } from '../utils'

const config = loadConfig()

export = (client: Discord.Client, message: Discord.Message): void => {
  //If the message either doesn't start with the prefix or was sent by a bot, exit early.
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Grab the command data from the client.commands
  const cmd = client.commands.get(command)
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return

  // Run the command
  cmd.run(message, args)
}
