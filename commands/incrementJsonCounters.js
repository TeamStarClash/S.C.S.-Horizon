module.exports = {
  name: 'incrementJsonCounters',
  description: 'set up user data',
  execute(member, counter, fs, jsonPath){

    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))

    if(!jsonFile.serverData[member.user.id][counter]){
      jsonFile.serverData[member.user.id][counter] = 0;
    }

    jsonFile.serverData[member.user.id][counter]++

    fs.writeFileSync(jsonPath, JSON.stringify(jsonFile, null, 2))
  }
}