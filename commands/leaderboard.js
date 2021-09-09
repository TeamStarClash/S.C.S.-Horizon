const Discord = require("discord.js")
module.exports = {
  name: 'leaderboard',
  description: 'Displays various server stats',
  instructions: 'Type !leaderboard or !leaderboard all to see a collection of all leaderboards. Type !leaderboard "stat" to see a specific statistic, and a brief description of the stat. Use !leaderboard boards to see the name of all the different leaderboards',
  async execute(msg, args, fs, jsonPath){

    embed = new Discord.MessageEmbed().setColor('#c00e0e').setTitle('Leaderboard')



    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))

    dataTypes = Object.getOwnPropertyNames(jsonFile.serverDataTypes)
    
    //see all boards
    if(args[0] == "boards"){
      for(const dataType in dataTypes){
        embed.addField(dataTypes[dataType], jsonFile.serverDataTypes[dataTypes[dataType]])
      }
      msg.channel.send(embed)
      return
    }

    //input validation
    if(args[0] && !(dataTypes.includes(args[0]) || args[0].toLowerCase() == "all")){
      msg.channel.send(`Provide the name of a stat, ${msg.author}`)
      return
    }
    
    if(dataTypes.includes(args[0])){
      embed.addField(args[0], jsonFile.serverDataTypes[args[0]] + returnTable(args[0], jsonFile.serverData))
    }else{
      for(const dataType in dataTypes){
        if(dataType % 3 == 2){
          embed.addField('\u200b', '\u200b', false)
        }
        embed.addField(dataTypes[dataType], returnTable(dataTypes[dataType], jsonFile.serverData), true)
      }
    }

    msg.channel.send(embed)
  }
}


//function to create tables
returnTable = function(type, statistics){
  table = "\`\`\`╔"
  nameColumnWidth = 0
  dataColumnWidth = 4
  //sets the width for name column
  for(const userID of Object.getOwnPropertyNames(statistics)){
    if(statistics[userID].name.length > nameColumnWidth){
      nameColumnWidth = statistics[userID].name.length
    }
  }
  nameColumnWidth += 3

  //creates the top row of characters
  for(i = 0; i < +nameColumnWidth+1+dataColumnWidth; i++){
    table += '═'
    if(nameColumnWidth - i === 0){
      table += '╤'
    }
  }
  table += '╗'

  //adds user data rows
  for(const userID of Object.getOwnPropertyNames(statistics)){
    //add names
    table += `\n║${statistics[userID].name}`
    for(i = 0; i <= nameColumnWidth - statistics[userID].name.length; i++){
      table += " "
    }
    table += "│"
    //name column ended, now adding data
    if(statistics[userID][type]){
      for(i = 0; i < dataColumnWidth - statistics[userID][type].toString().length; i++){
        table += " "
      }
      table += statistics[userID][type]
    }else{
      for(i = 0; i < dataColumnWidth-1; i++){
        table += " "
      }
      table += 0
    }
    table += "║"
    //second column ended
  }

  //create bottom row of characters
  table += "\n╚"
  for(i = 0; i < +nameColumnWidth+1+dataColumnWidth; i++){
    table = table + '═'
    if(nameColumnWidth - i === 0){
      table = table + '╧'
    }
  }
  table += '╝'
  table += '\`\`\`'

  return table
}
