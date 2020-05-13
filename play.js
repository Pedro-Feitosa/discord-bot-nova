const Discord = require('discord.js')
const client = new Discord.Client();
const get_weather = require('./weather-api')
const prefix = '!'
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  })

client.on('message', msg => {
    if (msg.content.startsWith('+char')) {
      const texto = msg.content.split("+char ")
      const char = texto[1].replace(/ /g, '%20')
      msg.channel.send(`https://www.novaragnarok.com/ROChargenPHP/newsig/${char}`)
  }
})

client.on('message', msg => {
  if (msg.content.startsWith('!weather')) {
    const texto = msg.content.split('!weather ')
    const cidade = texto[1].replace(/ /g, '%20')
    get_weather(cidade, (res) => {
      const weather_embed = new Discord.MessageEmbed()
      .setTitle(`Clima em ${res.location}`)
      .setColor(0xff0000)
      .setDescription(`Temperatura: ${res.temp}°C\nSensação Térmica: ${res.feels_like}°C\nUmidade: ${res.humidity}%\nVento: ${res.wind_speed}m/s`
      )
      msg.channel.send(weather_embed)
    })
  }
})

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'avatar') {
    const taggedUser = msg.mentions.users.first()
    if (!taggedUser) {
      const avatarEmbed = new Discord.MessageEmbed()
      .setTitle(`Avatar de ${msg.author.username}`)
      .setColor(0xff0000)
      .setImage(msg.author.displayAvatarURL())
      msg.channel.send(avatarEmbed);
    } else {
      const avatarEmbed = new Discord.MessageEmbed()
      .setTitle(`Avatar de ${taggedUser.username}`)
      .setColor(0xff0000)
      .setImage(taggedUser.displayAvatarURL())
      msg.channel.send(avatarEmbed);      
    }
  }

  if (command === 'rip') {
    msg.channel.send(`https://tenor.com/view/rip-coffin-black-ghana-celebrating-gif-16743302`)
    msg.channel.send('Rest in Piroca')
  }

})

client.login(process.env.DISCORD_TOKEN)
