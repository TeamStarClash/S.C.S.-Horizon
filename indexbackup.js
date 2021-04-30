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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  //const guild = client.guilds.get
  //MUST GET ROLE POSITION 
})

client.on('guildMemberAdd', (member) => {
  general = member.guild.channels.get('general')
  general.send(`Welcome ${member.user.username}!`)
})

var re = /[0-9a-f]{6}/

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
    msg.channel.send(`This server's name is: ${msg.guild.name}`);
  }
  
  //colors a persons name based on the arg
  else if (command === 'colorme'){
    botRolePosition = msg.guild.members.resolve(client.user).roles.highest.position
    console.log(botRolePosition)
    //validate input
    if(!args.length){
      msg.channel.send(`You didn't provide any arguments, ${msg.author}.`)
      return
    }
    if(args.length > 1){
      msg.channel.send(`Only provide the hex value of the color you wish to have, ${msg.author}.`)
      return
    }

    //makes sure input is hex
    args[0] = args[0].toLowerCase()
    if(args[0].length === 6 && re.test(args[0])){
      colorcode = "#".concat(args[0])
    }
    else if(args[0].length === 7 && re.test(args[0].slice(-6))){
      colorcode = "#".concat(args[0].slice(-6))
    }
    else{
      msg.channel.send(`Provide a color in hex format, ${msg.author}.`)
      return
    }
    //creates the roll, sets appropriate settings, adds to user. Deletes old roll if not necessary
    msg.guild.roles.create({ data: { name: colorcode, color: colorcode, permissions: ['MANAGE_MESSAGES'] } }).then((role) => {
      role.setMentionable(false);
      role.setHoist(false);
      role.setPosition(botRolePosition).then((data) => {
        //this line will add the role to a collection of color roles
        msg.channel.send(`Color created`)
        console.log(`created role with name: ${role.name}`)
                    //this will instead search in the collection of color roles, seeing if the user has any.
        removeRole = msg.member.roles.cache.find(role => role.name.startsWith('#'))
        if(removeRole){
          msg.member.roles.remove(removeRole).then((member) => {
            member.roles.add(role)
            //console.log(`Role: ${removeRole.name} to remove members: ${removeRole.members.size}`)
            if(removeRole.members.size === 1){
              console.log(`user is: ${removeRole.members.first.user}`)
            }
            //removes role if no one is using it
            if(removeRole.members.size < 1 || (removeRole.members.size === 1 && removeRole.members.first.user === 'undefined')){
              console.log(`role with name: ${removeRole.name} was deleted`)
              removeRole.delete()
            }
          })
        }else{
          msg.member.roles.add(role)
        }
      })
    })
    
    //find already created role by name = msg.guild.roles.cache.find(role => role.name === 'test2')
  }

  //remove unused colors
  else if(command === 'cleancolors'){
    return
  }
  
  //remove all colors
  else if (command === 'wipecolors'){
    return
  }

  //elevate pigeon
  else if (command === 'flypigeonfly'){
    //code to elevate pigeonhead role
    botRolePosition = msg.guild.members.resolve(client.user).roles.highest.position
    pigeonsfly = true;
    pigeon = msg.guild.roles.cache.find(role => role.name === 'pigeon head')
    pigeon.setPosition(botRolePosition-1)
    msg.delete();
  }

  //delevate pigeon
  else if (command === 'downpigeon'){
    //code to lower pigeonhead role
    pigeonsfly = false;
    pigeon = msg.guild.roles.cache.find(role => role.name === 'pigeon head')
    pigeon.setPosition(1)
    msg.delete();
  }
  /*
  https://discord.js.org/#/docs/main/stable/class/GuildMemberRoleManager
  The set method on this site can be used to restore roles after someone is kicked.
  I need to make a collection<snowflake, role> for each member, to save after they are kicked.
  A collection<snowflake, role> of each colorme role would be helpful too.
  */
})

client.login(process.env.TOKEN)