module.exports = {
  name: 'ping',
  description: 'Ping',
  instructions: 'Type !ping to have the bot respond with Pong',
  execute(msg){
    //msg.reply("pong")     //this will @ the person
    msg.channel.send('Pong');
  }
}