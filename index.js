const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()
client.commands = new Discord.Collection();

const {prefix, somethingelse} = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
}


//testing jsons
var jsonPath = './jsons/test.json'
var jsonFile = JSON.parse(fs.readFileSync(jsonPath))


//end testing jsons


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberRemove", (member) => {
    console.log(`a member leaves a guild, or is kicked: ${member.tag}`);
    
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
  
  //colors a persons name based on the arg
  else if (command === 'colorme'){
    client.commands.get('colorme').execute(msg, args, client)
  }

  //removes color role from person
  else if (command === 'cleanme'){
    return
  }
  //remove unused colors
  else if(command === 'cleancolors'){
    return
  }
  
  //remove all colors
  else if (command === 'wipecolors'){
    return
  }

  /*
  https://discord.js.org/#/docs/main/stable/class/GuildMemberRoleManager
  The set method on this site can be used to restore roles after someone is kicked.
  I need to make a collection<snowflake, role> for each member, to save after they are kicked.
  A collection<snowflake, role> of each colorme role would be helpful too.
  */
})

client.login(process.env.TOKEN)