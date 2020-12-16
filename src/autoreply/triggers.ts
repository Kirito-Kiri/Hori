import { Message } from 'discord.js'

export const autoreply = (msg: Message) => {
  if (msg.author.bot) return
  const triggers = ['Pat', 'Nyaa']
  triggers.forEach(trigger => {
    if (msg.content.includes(trigger)) return msg.channel.send('oof')
  })
}
