import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Role extends Command {
  public constructor() {
    super({
      name: 'role',
      description: 'Assigns a role to the mentioned user',
      argumentRequired: true,
      isGuildOnly: true,
      isOwnerOnly: false,
      permsNeeded: ['SEND_MESSAGES', 'MANAGE_ROLES']
    })
  }

  public async run(msg: Message) {
    const user = msg.mentions.users.first()
    const contributor = msg.guild.roles.cache.find(role => role.name == 'Contributor')
    if (user) {
      const member = msg.guild.member(user)
      if (member) {
        try {
          await member.roles.add(contributor)
          return msg.reply(`Added ${contributor} to ${user.username}`)
        } catch (err) {
          console.error(err)
          return msg.reply(`Unable to assign the role`)
        }
      } else {
        return msg.reply('The user is not a member of the guild')
      }
    } else {
      return msg.reply('Please mention a user')
    }
  }
}
