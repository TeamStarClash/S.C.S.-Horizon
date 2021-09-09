const Discord = require("discord.js")
module.exports = {
  name: 'audiolist',
  description: 'List all audio files',
  instructions: 'Type !audiolist to see the names of all audio files stored',
  async execute(msg, fs){

    embed = new Discord.MessageEmbed().setColor('#c00e0e').setTitle('List of Audio Files')

    audioFileNames = ""
    const audioFiles = fs.readdirSync('./media/audio').filter(file => file.endsWith('.mp3'))
    for(const file of audioFiles){
      audioFileNames = audioFileNames + file.slice(0, -4) + "\n"
    }
    embed.addField("Files:", audioFileNames)
    msg.channel.send(embed)
  }
}

