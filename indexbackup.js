const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()
client.commands = new Discord.Collection();

const {prefix} = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
}

var jsonPath = './jsons/data.json'


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberRemove", (member) => {
    console.log(`a member leaves a guild, or is kicked: ${member.user.tag}`);
    client.commands.get('saveRoles').execute(member, fs, jsonPath)
    client.commands.get('countkicks').execute(member, fs, jsonPath)
    
})

client.on("guildMemberAdd", (member) => {
  client.commands.get('returnRoles').execute(member, fs, jsonPath)
})

//recieves commands through chat
client.on('message', msg => {
  //prevents bot from speaking to itself
  if(!msg.content.startsWith(prefix) || msg.author.bot)
    return;

  //this gives us the command and an array of arguments
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  //sends pong in chat if someone says ping
  if (command === 'ping'){
    //msg.reply("pong")     //this will @ the person
    client.commands.get('ping').execute(msg, args)
  }

  //sends servers name
  else if (command === 'server'){
    client.commands.get('server').execute(msg, args)
  }

  //doughnuts
  else if (command === "doughnuts"){
    client.commands.get('doughnuts').execute(msg)
  }
  //increment number stored in json
  else if (command === 'json'){
    client.commands.get('json').execute(msg, args, fs, jsonPath)
  }
  
  
  
  /*
  //colors a persons name based on the arg
  else if (command === 'colorme'){
    client.commands.get('colorme').execute(msg, args, client)
  }
  */
})

client.login(process.env.TOKEN)