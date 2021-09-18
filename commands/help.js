const Discord = require("discord.js")
module.exports = {
  name: 'help',
  description: 'Get help',
  execute(msg, commands){

    embed = new Discord.MessageEmbed().setColor('#c00e0e').setTitle('List of Commands')
    commands.each(function(value, key, map){
      if(value.instructions){
        embed.addField(value.name, value.instructions)
      }
    })
    //for(const command of commands){
    //  if(command.instructions){
    //    embed.addField(command.name, command.instructions)
    //  }
    //}
    msg.channel.send({embeds: [embed]})
  }
}
