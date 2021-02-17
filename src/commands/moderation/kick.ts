import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Kick extends Command {
  public constructor() {
    super({
      name: 'kick',
      description: 'Kicks a member from the server',
      argumentRequired: true,
      isGuildOnly: true,
      isOwnerOnly: false,
      permsNeeded: ['SEND_MESSAGES', 'KICK_MEMBERS']
    })
  }

  public async run(msg: Message, args: string) {
    const user = msg.mentions.users.first()
    const reason = args || 'No reason provided'
    if (user) {
      const member = msg.guild.member(user)
      const embed = new MessageEmbed()
      if (member) {
        try {
          await member.kick(reason)
          embed
            .setAuthor(msg.guild.member(msg.author).displayName)
            .setColor('ORANGE')
            .setTitle('User kicked!')
            .setDescription(`Kicked <!@${user.id}> succesfully`)
            .setTimestamp(msg.createdTimestamp)
          return msg.reply(embed)
        } catch (err) {
          console.error(err)
          return msg.reply('I was unable to kick the user')
        }
      } else {
        return msg.reply('The user is not a member of the guild')
      }
    } else {
      return msg.reply('Please mention a user')
    }
  }
}
