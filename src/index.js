require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const checkCommand = (msg,msgChannelID) => {
  switch(msg){
    case "hw":
      console.log('idk');
      break;
    default:
      console.log('idklol');
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.channel.id === '590313696492912801' && !msg.author.bot){
    console.log(msg.content);
    msg.channel.send(msg.content);
  }
})

client.login(process.env.DISCORD_TOKEN);