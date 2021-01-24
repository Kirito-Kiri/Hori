import { Message, PermissionString } from 'discord.js'

export interface CommandData {
  name: string
  description: string
  cooldown?: number
  argumentRequired?: boolean
  isGuildOnly?: boolean
  isOwnerOnly?: boolean
  isDmOnly?: boolean
  permsNeeded?: PermissionString[]
}

export class Command {
  public name: string

  public description: string

  public cooldown: number

  public argumentRequired: boolean

  public isGuildOnly: boolean

  public isOwnerOnly: boolean

  public isDmOnly: boolean

  public permsNeeded: PermissionString[]

  public constructor(data: CommandData) {
    this.name = data.name
    this.description = data.description
    this.argumentRequired = data.argumentRequired === true
    this.isGuildOnly = data.isGuildOnly !== false
    this.isOwnerOnly = data.isOwnerOnly === false
    this.cooldown = data.cooldown || 2
    this.permsNeeded = data.permsNeeded || ['SEND_MESSAGES']

    if (this.isDmOnly) {
      this.isGuildOnly = false
    }
    if (this.isGuildOnly) {
      this.isDmOnly = false
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public async run(msg: Message, args: string): Promise<any> {}
}
