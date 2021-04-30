var re = /[0-9a-f]{6}/

module.exports = {
  name: 'colorme',
  description: 'Color your name',
  execute(msg, args, client){


    botRolePosition = msg.guild.members.resolve(client.user).roles.highest.position
    userRolePosition = msg.member.roles.highest.position
    rolePosition = Math.min(botRolePosition, userRolePosition+1)

    console.log(`botRolePosition is: ${botRolePosition}, userRolePosition is: ${userRolePosition}, and rolePosition is: ${rolePosition}`)

    //validate input
    if(!args.length){
      msg.channel.send(`You didn't provide any arguments, ${msg.author}.`)
      return
    }
    if(args.length > 1){
      msg.channel.send(`Only provide the hex value of the color you wish to have, ${msg.author}.`)
      return
    }

    //makes sure input is hex
    args[0] = args[0].toLowerCase()
    if(args[0].length === 6 && re.test(args[0])){
      colorcode = "#".concat(args[0])
    }
    else if(args[0].length === 7 && re.test(args[0].slice(-6))){
      colorcode = "#".concat(args[0].slice(-6))
    }
    else{
      msg.channel.send(`Provide a color in hex format, ${msg.author}.`)
      return
    }
    //creates the roll, sets appropriate settings, adds to user. Deletes old roll if not necessary
    msg.guild.roles.create({ data: { name: colorcode, color: colorcode, permissions: ['MANAGE_MESSAGES'] } }).then((role) => {
      role.setMentionable(false);
      role.setHoist(false);
      role.setPosition(rolePosition).then((data) => {
        //this line will eventually add the role to a collection of color roles
        msg.channel.send(`Color created`)
        //console.log(`created role with name: ${role.name}`)
                    //this will instead search in the collection of color roles, seeing if the user has any.
        removeRole = msg.member.roles.cache.find(role => role.name.startsWith('#'))
        if(removeRole){
          msg.member.roles.remove(removeRole).then((member) => {
            member.roles.add(role)
            //console.log(`Role: ${removeRole.name} to remove members: ${removeRole.members.size}`)
            //if(removeRole.members.size === 1){
            //  console.log(`user is: ${removeRole.members.first.user}, bool should be ${removeRole.members.first.user == undefined}`)
            //}
            //removes role if no one is using it
            if(removeRole.members.size < 1 || (removeRole.members.size === 1 && removeRole.members.first.user === undefined)){
              //console.log(`role with name: ${removeRole.name} was deleted`)
              removeRole.delete()
            }
          })
        }else{
          msg.member.roles.add(role)
        }
      })
    })

    
  }
}