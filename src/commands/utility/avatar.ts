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
    const user = msg.mentions.users.first() || msg.author
    const embed = new MessageEmbed()
    embed
      .setImage(user.avatarURL({ dynamic: true, size: 1024 }))
      .setAuthor(msg.guild.member(user).displayName, user.avatarURL({ dynamic: true }))
      .setTimestamp(msg.createdTimestamp)
      .setColor('AQUA')
    return await msg.channel.send(embed)
  }
}
