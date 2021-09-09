module.exports = {
  name: 'setUpData',
  description: 'set up user data',
  execute(member, fs, jsonPath){

    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))

    if(!jsonFile.serverData[member.user.id]){
      jsonFile.serverData[member.user.id] = {}
      jsonFile.serverData[member.user.id].name = member.nickname
    }

    fs.writeFileSync(jsonPath, JSON.stringify(jsonFile, null, 2))
  }
}