module.exports = {
  name: 'server',
  description: 'Server',
  execute(msg, args){
    msg.channel.send(`This server's name is: ${msg.guild.name}`);
  }
}