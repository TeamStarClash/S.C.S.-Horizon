module.exports = {
  name: 'returnRoles',
  description: 'Return roles and nickname when member joins',
  execute(member, fs, jsonPath){

    var jsonFile = JSON.parse(fs.readFileSync(jsonPath))

    if(jsonFile.deletedUsers.hasOwnProperty(member.user.id)){

      member.roles.add(jsonFile.deletedUsers[member.user.id].roles)
      member.setNickname(jsonFile.deletedUsers[member.user.id].nickname)
      jsonFile.deletedUsers[member.user.id].roles = []
      fs.writeFileSync(jsonPath, JSON.stringify(jsonFile, null, 2))

    }

  }
}