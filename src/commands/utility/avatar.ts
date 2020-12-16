import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class avatar extends Command {
  public constructor() {
    super({
      name: 'avatar',
      description: 'Displays avatar of the user',
      isGuildOnly: true
    })
  }

  public async run(msg: Message) {
    const user = msg.mentions.users.first()
    if (user) {
      return await msg.reply(user.displayAvatarURL({ dynamic: true }))
    } else {
      return await msg.reply(msg.author.displayAvatarURL({ dynamic: true }))
    }
  }
}
