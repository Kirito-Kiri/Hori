import { Message, TextChannel, DMChannel } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class DeleteMessages extends Command {
  public constructor() {
    super({
      name: 'nuke',
      description: 'Deletes x messages as provided in argument',
      argumentRequired: true,
      isGuildOnly: true,
      permsNeeded: ['MANAGE_MESSAGES']
    })
  }

  public async run(msg: Message, args: string) {
    const num = Number(args[0])
    msg.delete()
    if (msg.channel instanceof DMChannel) return
    if (num > 100 || num < 1) return
    if (!isNaN(num) && msg.channel instanceof TextChannel) {
      try {
        return await msg.channel.bulkDelete(num, true)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
