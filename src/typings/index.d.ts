import { Command } from 'Structure/Command'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>
    aliases: Collection<string, any>
  }
}
