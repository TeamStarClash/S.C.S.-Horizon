module.exports = {
  name: 'playaudio',
  description: 'play an audio file',
  instructions: 'Type !playaudio followed by the name of the audio you wish to have the bot to play. You must be in a voice channel for this to work.',
  async execute(msg, args, fs){

    if(!args.length){
      msg.channel.send(`You didn't provide any arguments, ${msg.author}.`)
      return
    }
    if(args.length > 1){
      msg.channel.send(`Only provide the audio file name, ${msg.author}.`)
      return
    }
    if(!msg.member.voice.channel){
      msg.channel.send(`Join a voice channel, ${msg.author}.`)
      return
    }

    if(!fs.existsSync(`./media/audio/${args[0]}.mp3`)){
      msg.channel.send(`This file does not exist, ${msg.author}.`)
      return
    }

    const voiceChannel = msg.member.voice.channel;

    const  connection = await voiceChannel.join();

    connection.play(`./media/audio/${args[0]}.mp3`, {seek: 0, volume: 1}).on('finish', () =>{
      voiceChannel.leave();
    });

  }
}

