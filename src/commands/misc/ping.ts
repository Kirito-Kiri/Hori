import { Message } from 'discord.js'
import { Command } from '../../Structure/Command'

export default class Ping extends Command {
  public constructor() {
    super({
      name: 'ping',
      description: 'Ping!',
      argumentRequired: false
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async run(msg: Message): Promise<void> {
    msg.channel.send(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms`).catch(console.error)
  }
}
