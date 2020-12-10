import Discord from 'discord.js'
import { loadConfig } from '../utils'
const config = loadConfig()

export = (client: Discord.Client, message: Discord.Message): void => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)
  if (!cmd) return
  if (!message.guild.me.hasPermission(cmd.permsNeeded)) {
    message.reply(`I lack ${cmd.permsNeeded} permissions`)
  } else if (!message.member.hasPermission(cmd.permsNeeded)) {
    message.reply(`You do not have ${cmd.permsNeeded} permissions`)
  } else {
    cmd.run(message, args)
  }
}
