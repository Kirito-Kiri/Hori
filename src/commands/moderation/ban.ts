import { BanOptions } from 'discord.js'
import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Ban extends Command {
  public constructor() {
    super({
      name: 'ban',
      description: 'Bans a user from the server',
      argumentRequired: true,
      isGuildOnly: true,
      permsNeeded: ['BAN_MEMBERS']
    })
  }

  public async run(msg: Message, args: string) {
    const user = msg.mentions.users.first()
    if (user) {
      const member = msg.guild.member(user)

      if (!isNaN(Number(args.charAt(0)))) {
        const days: BanOptions['days'] = Number(args.charAt(0)) || 0
        const reason: BanOptions['reason'] = args.slice(1)
        const range: number[] = [1, 2, 3, 4, 5, 6, 7]

        if (!reason) {
          return msg.reply(`Please provide a reason!`)
        }

        if (range.includes(days)) {
          if (member) {
            try {
              await member.ban({ days, reason })
              return msg.reply(`Banned ${user.tag} succesfully and deleted ${days} messages by ${user.tag}`)
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

          try {
            await member.ban({ reason })
            return msg.reply(`Banned ${user.tag} succesfully`)
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
