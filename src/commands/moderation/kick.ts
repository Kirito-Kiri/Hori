import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Kick extends Command {
  public constructor() {
    super({
      name: 'kick',
      description: 'Kicks a member from the server',
      argumentRequired: true,
      isGuildOnly: true,
      permsNeeded: ['SEND_MESSAGES', 'KICK_MEMBERS']
    })
  }

  public async run(msg: Message, args: string[]) {
    const user = msg.mentions.users.first()
    const reason = args.toString()
    if (user) {
      const member = msg.guild.member(user)
      if (member) {
        await member
          .kick(reason)
          .then(() => {
            msg.reply(`Kicked ${user.username} succesfully`)
          })
          .catch(err => {
            msg.reply('I was unable to kick the user')
            console.error(err)
          })
      } else {
        msg.reply('The user is not a member of the guild')
      }
    } else {
      msg.reply('Please mention a user')
    }
  }
}
