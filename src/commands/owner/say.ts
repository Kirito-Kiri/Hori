import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class say extends Command {
  public constructor() {
    super({
      name: 'say',
      description: 'Repeats what you said and deletes the command',
      argumentRequired: true,
      isGuildOnly: true,
      isOwnerOnly: true
    })
  }

  public async run(msg: Message, args: string) {
    try {
      await msg.delete()
      await msg.channel.send(args)
    } catch (err) {
      console.log(err)
    }
  }
}
