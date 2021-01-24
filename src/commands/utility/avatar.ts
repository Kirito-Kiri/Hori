import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class avatar extends Command {
  public constructor() {
    super({
      name: 'avatar',
      description: 'Displays avatar of the user',
      isGuildOnly: true,
      isOwnerOnly: false
    })
  }

  public async run(msg: Message) {
    const user = msg.mentions.users.first()
    const embed = new MessageEmbed()
    if (user) {
      embed
        .setAuthor(msg.author)
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${user} avatar`)
      return await msg.channel.send(embed)
    } else {
      embed
        .setAuthor(msg.author)
        .setImage(msg.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${msg.author} avatar`)
      return await msg.channel.send(embed)
    }
  }
}
