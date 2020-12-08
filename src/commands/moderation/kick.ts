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
    await msg.reply(`owo`)
    const reason = args
    console.log(reason)
  }
}
