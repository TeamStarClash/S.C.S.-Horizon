module.exports = {
  name: 'removeaudio',
  description: 'Remove audio files',
  instructions: 'Type !removeaudio "name". Replace "name" with the name of the audio you want to remove.',
  execute(msg, args, fs){

    if(!args.length){
      msg.channel.send(`You didn't provide the name of the audio, ${msg.author}.`)
      return
    }
    if(args.length > 1){
      msg.channel.send(`Only provide the audio file name, ${msg.author}.`)
      return
    }

    if(fs.existsSync(`./media/audio/${args[0].toLowerCase()}.mp3`)){
      //fs.unlinkSync() to remove old file
      fs.unlinkSync(`./media/audio/${args[0].toLowerCase()}.mp3`)

    } else {
      msg.channel.send(`Audio by the name ${args[0].toLowerCase()} cannot be found, ${msg.author}`)
    }

  }
}