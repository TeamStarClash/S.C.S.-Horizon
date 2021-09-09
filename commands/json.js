module.exports = {
  name: 'json',
  description: 'Increment number stored in json',
  instructions: 'For testing purposes. Typing !json will increment a number stored in a json file and return it.',
  execute(msg, fs, jsonPath){

    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))

    jsonFile.testSaveArea.var1++
    var var1 = Number(jsonFile.testSaveArea.var1)
    msg.channel.send(var1);
    fs.writeFileSync(jsonPath, JSON.stringify(jsonFile, null, 2))
  }
}