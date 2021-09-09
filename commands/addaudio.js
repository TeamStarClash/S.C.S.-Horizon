module.exports = {
  name: 'addaudio',
  description: 'Add audio files',
  instructions: 'Type !addaudio "name", attaching the audio file you wish to add to your message. Replace "name" with the name you want the audio to be stored as.',
  execute(msg, args, fs, request){

    if(!args.length){
      msg.channel.send(`You didn't provide the name to store the file as, ${msg.author}.`)
      return
    }
    if(args.length > 1){
      msg.channel.send(`Only provide the audio file name, ${msg.author}.`)
      return
    }
    if(!msg.attachments.first()){
      msg.channel.send(`Provide an audio file, ${msg.author}.`)
      return
    }
    if(!msg.attachments.first().name.endsWith(`.mp3`)){
      msg.channel.send(`Provide an audio file in .mp3 format, ${msg.author}.`)
      return
    }

    if(fs.existsSync(`./media/audio/${args[0].toLowerCase()}.mp3`)){
      msg.channel.send(`There is already a file with this name, ${msg.author}.`)
      //add reaction choice
      //fs.unlinkSync() to remove old file
      //fs.rename('/path/to/Afghanistan.png', '/path/to/AF.png') to rename file
      return
    }

    request.get(msg.attachments.first().url).pipe(fs.createWriteStream(`./media/audio/${args[0].toLowerCase()}.mp3`)).on('finish', function() {
        msg.delete()
    })

    msg.channel.send(`Audio has been saved as ${args[0].toLowerCase()}`)
    
  }
}