import { Client } from 'discord.js'
//import fs from 'fs'
import { loadConfig } from "./utils"
const config = loadConfig()

const client: Client = new Client()

client.on('ready',() => {
    console.log(`${client.user.username}`)
}) 

client.login(config.token)