const fs = require('fs')
//const request = require('request')
const Discord = require("discord.js")
const client = new Discord.Client({
  intents:[
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
  ]
  //CHANGE THIS LATER
})
client.commands = new Discord.Collection()
client.slashCommands = new Discord.Collection()

const config = {prefix: "!"};

//set up command files to be used
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
}

//set up slash command files to be used
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'))
for(const file of slashCommandFiles){
  const command = require(`./slashCommands/${file}`)
  client.slashCommands.set(command.name, command);
}

var jsonPath = './jsons/data.json'

//method to apply / commands
const getApp = (guildId) => {
  const app = client.api.applications(client.user.id)
  if(guildId){
    app.guilds(guildId)
  }
  return app
}

//logs when bot is connected
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'})

  //send / commands to discord
  await getApp('411611267103719439').commands.post({
    data: {
      name: 'ping',
      description: 'Ping pong command'
    }
  })
  await getApp('411611267103719439').commands.post({
    data: {
      name: 'help',
      description: 'See a list of possible commands'
    }
  })
  await getApp('411611267103719439').commands.post({
    data: {
      name:'test',
      description: 'To test things'
    }
  })
})

//react to / commands
client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase()
  const args = interaction.data.options

  if(command === 'ping'){
    reply(interaction, client.slashCommands.get('ping').execute())
  }
  else if(command === 'help'){
    reply(interaction, client.slashCommands.get('help').execute(client.commands))
  }
  else if(command === 'test'){
    reply(interaction, client.slashCommands.get('test').execute(interaction, client))
  }
})

//makes sending / command response to discord easier
const reply = async (interaction, response) => {
  let data = {
    content: response
  }
  //check if embed
  if(typeof response === 'object'){
    data = await createAPIMessage(interaction, response)
  }

  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data
    }
  })
}

//formats embeds for / command replies
const createAPIMessage = async (interaction, content) => {
  const {data, files} = await Discord.APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  ).resolveData().resolveFiles()

  return {...data, files}
}

//saves roles and increments kicked counter
client.on("guildMemberRemove", (member) => {
    console.log(`a member leaves a guild, or is kicked: ${member.user.tag}`);
    client.commands.get('saveRoles').execute(member, fs, jsonPath)
    client.commands.get('incrementJsonCounters').execute(member, 'kicked', fs, jsonPath)
    //need to add kicks to the person who did the kicking, need to read audit log for that
    
})

//sets up server data for the person
client.on("guildMemberAdd", (member) => {
  client.commands.get('returnRoles').execute(member, fs, jsonPath)
  client.commands.get('setUpData').execute(member, fs, jsonPath)
})

//recieves commands through chat
client.on('messageCreate', msg => {

  //prevents bot from speaking to itself
  if(msg.author.bot)
    return;

  //this is where conversations will be checked

  //good bot
  if(msg.content === 'good bot'){
    msg.channel.send(`Thanks`)
  }

  //all further commands require the prefix
  if(!msg.content.startsWith(config.prefix))
    return;
    
  //this gives us the command and an array of arguments
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  //sends pong in chat if someone says ping
  if (command === 'ping'){
    client.commands.get('ping').execute(msg)
  }

  //sends servers name
  else if (command === 'server'){
    client.commands.get('server').execute(msg)
  }
  
  //sends list of commands
  else if (['help', 'helpme', 'commands', 'command'].includes(command)){
    client.commands.get('help').execute(msg, client.commands)
  }

  //doughnuts
  else if (['doughnuts', 'doughnut', 'donuts', 'donut'].includes(command)){
    client.commands.get('doughnuts').execute(msg)
    client.commands.get('incrementJsonCounters').execute(msg.member, 'donutCounter', fs, jsonPath)
  }

  //play a soundbite
  else if(command === 'playaudio'){
    client.commands.get('playaudio').execute(msg, args, fs)
  }
  
  //add a soundbite
  else if(command === 'addaudio'){
   // client.commands.get('addaudio').execute(msg, args, fs, request)
  }

  //see all available audio files to play
  else if(command === 'audiolist'){
    client.commands.get('audiolist').execute(msg, fs)
  }

  //remove an audio file
  else if(command === 'removeaudio'){
    client.commands.get('removeaudio').execute(msg, args, fs)
  }
  //increment number stored in json for testing
  else if (command === 'json'){
    client.commands.get('json').execute(msg, fs, jsonPath)
  }
  
  else if (command === 'leaderboard'){
    client.commands.get('leaderboard').execute(msg, args, fs, jsonPath)
  }
  /*
  who kicks who
  run starclash
  who starts conversations
  groovy
  groovy mk. 2: https://www.youtube.com/watch?v=3wJJDM7jUsk  queue: https://gabrieltanner.org/blog/dicord-music-bot
  */
  
  /*
  //colors a persons name based on the arg
  else if (command === 'colorme'){
    client.commands.get('colorme').execute(msg, args, client)
  }
  */
})

client.login(process.env.TOKEN)
