const Discord = require('discord.js');

module.exports = async (client, message, channel) => {
    if (message.author.bot) return;

    var content = message.content;
    if (!content) content = "No text to be found";

    let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.avatarURL({ size: 4096 })}`)
        .setDescription(content)
        .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
        .setTimestamp()
        .setColor(client.config.embedColor)
    channel.send(embed);
}