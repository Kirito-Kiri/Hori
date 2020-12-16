import Discord from 'discord.js'
import { loadConfig } from '../utils'
import { autoreply } from '../autoreply/triggers'
const config = loadConfig()

export = (client: Discord.Client, message: Discord.Message) => {
  autoreply(message)
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  const arg = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = arg.shift().toLowerCase()
  const cmd = client.commands.get(command)
  const args = arg.join(' ')
  if (!cmd) return

  if (!message.guild.me.hasPermission(cmd.permsNeeded)) {
    return message.reply(`I lack ${cmd.permsNeeded} permissions`)
  } else if (!message.member.hasPermission(cmd.permsNeeded)) {
    return message.reply(`You do not have ${cmd.permsNeeded} permissions`)
  }

  if (!cmd.isOwnerOnly) {
    return cmd.run(message, args)
  } else if (cmd.isOwnerOnly && message.author.id === config.owner) {
    return cmd.run(message, args)
  } else {
    return message.channel.send('kek')
  }
}
