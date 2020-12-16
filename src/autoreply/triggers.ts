import { Message } from 'discord.js'
/**
 * Sends a message on matching trigger
 * @param msg Message sent by user
 */
export const autoreply = (msg: Message) => {
  if (msg.author.bot) return
  const triggers = ['Pat', 'Nyaa']
  triggers.forEach(trigger => {
    if (msg.content.includes(trigger)) return msg.channel.send('oof')
  })
}
