import { Message, MessageEmbed, BanOptions } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Ban extends Command {
  public constructor() {
    super({
      name: 'ban',
      description: 'Bans a user from the server',
      argumentRequired: true,
      isGuildOnly: true,
      isOwnerOnly: false,
      permsNeeded: ['BAN_MEMBERS']
    })
  }

  public async run(msg: Message, args: string) {
    const user = msg.mentions.users.first()
    if (user) {
      const member = msg.guild.member(user)
      const embed = new MessageEmbed()

      if (!isNaN(Number(args.charAt(0)))) {
        const days: BanOptions['days'] = Number(args.charAt(0)) || 0
        const reason: BanOptions['reason'] = args.slice(1)
        const range: number[] = [1, 2, 3, 4, 5, 6, 7]

        if (!reason) return msg.reply(`Please provide a reason!`)

        if (range.includes(days)) {
          if (member) {
            try {
              await member.ban({ days, reason })
              embed
                .setAuthor(msg.guild.member(msg.author).displayName, msg.author.avatarURL({ dynamic: true }))
                .setTitle('User Banned')
                .setColor('RED')
                .setDescription(
                  `Banned <!@${user.id}> succesfully. Their messages for ${days} days were deleted.
                  Reason: ${reason}`
                )
              return msg.reply(embed)
            } catch (err) {
              console.error(err)
              return msg.reply('I was unable to ban the user')
            }
          } else {
            return msg.reply('The user is not a member of the guild')
          }
        } else {
          return msg.reply(`Please provide a number between 1 - 7`)
        }
      } else {
        if (member) {
          const reason: BanOptions['reason'] = args
          if (!reason) return msg.reply(`Please provide a reason!`)

          try {
            await member.ban({ reason })
            embed
              .setAuthor(msg.guild.member(msg.author).displayName, msg.author.avatarURL({ dynamic: true }))
              .setColor('RED')
              .setTimestamp(msg.createdTimestamp)
              .setTitle('User banned!')
              .setDescription(
                `Banned <!@${user.id}> succesfully.
                Reason: ${reason}`
              )
            return msg.reply(embed)
          } catch (err) {
            console.error(err)
            return msg.reply('I was unable to ban the user')
          }
        } else {
          return msg.reply('The user is not a member of the guild')
        }
      }
    } else {
      return msg.reply('Please mention a user')
    }
  }
}
