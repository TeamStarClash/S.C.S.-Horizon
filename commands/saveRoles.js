module.exports = {
  name: 'saveRoles',
  description: 'Save roles and nickname after someone is kicked',
  execute(member, fs, jsonPath){

    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))
    
    keyArray = member.roles.cache.keyArray()
    keyArray.pop()
    if(!jsonFile.deletedUsers[member.user.id]){
      jsonFile.deletedUsers[member.user.id] = {}
    }
    jsonFile.deletedUsers[member.user.id].roles = keyArray
    jsonFile.deletedUsers[member.user.id].nickname = member.nickname
    fs.writeFileSync(jsonPath, JSON.stringify(jsonFile, null, 2))
  }
}