module.exports = {
  name: 'test',
  description: 'testing things',
  execute(interaction, client){
    console.log(Object.getOwnPropertyNames(interaction))
    //member returns member object of person who used the / command
    console.log(Object.getOwnPropertyNames(interaction.member))
    console.log(interaction.member.nick) //returns nick of person who ran the / command

    return 'test';
  }
}