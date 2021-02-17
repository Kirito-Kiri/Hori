import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Ping extends Command {
  public constructor() {
    super({
      name: 'ping',
      description: 'Ping!',
      argumentRequired: false,
      isOwnerOnly: false
    })
  }

  public async run(msg: Message) {
    const embed = new MessageEmbed()
    try {
      embed
        .setAuthor(msg.author)
        .setColor('cyan')
        .setTitle('Ping Result')
        .setDescription(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms`)
      return await msg.channel.send(embed)
    } catch (err) {
      console.error(err)
    }
  }
}
