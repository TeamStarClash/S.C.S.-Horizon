module.exports = {
  name: 'server',
  description: 'Server',
  instructions: 'For testing purposes. The bot will respond by saying the name of the server it is in.',
  execute(msg){
    msg.channel.send(`This server's name is: ${msg.guild.name}`);
  }
}