module.exports = {
  name: 'doughnuts',
  description: 'Mmmm... doughnuts',
  instructions: 'Type !donuts, !doughnuts, !donut, or !doughnut to see a short gif of a doughnut.',
  execute(msg){
    msg.delete()
    msg.channel.send({
      files: [{
        attachment: `./media/doughnuts/doughnut${Math.floor(Math.random() * 4)}.gif`,
        name:'doughnut.gif'
      }]
    }).then((message) =>{
      message.delete({timeout: 5000})
    })
  }

}