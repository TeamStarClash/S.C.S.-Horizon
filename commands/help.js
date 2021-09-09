const Discord = require("discord.js")
module.exports = {
  name: 'help',
  description: 'Get help',
  execute(msg, commands){

    embed = new Discord.MessageEmbed().setColor('#c00e0e').setTitle('List of Commands')
    for(const command of commands){
      if(command.instructions){
        embed.addField(command.name, command.instructions)
      }
    }
    msg.channel.send(embed)
  }
}