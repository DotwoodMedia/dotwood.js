const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage, channel) => {
    if (oldMessage.content === newMessage.content) {
        return;
    }

    if (oldMessage.author.bot) return;

    var content = oldMessage.content;
    if (!content) content = "No text to be found";

    let embed = new Discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag}`, `${oldMessage.author.avatarURL({ size: 4096 })}`)
        .setDescription(`**Message changed <@${oldMessage.author.id}> in ${oldMessage.channel}**\n **From:** \n${oldMessage}\n **To:** \n${newMessage}`)
        .setFooter(`Author: ${oldMessage.author.id} | Message id: ${oldMessage.id}`)
        .setTimestamp()
        .setColor(client.config.embedColor)
    channel.send(embed);
}