const Discord = require('discord.js');

module.exports = async (client, guild, user, channel) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Member banned`, `${user.avatarURL({ size: 4096 })}`)
        .setDescription(`${user} ${user.tag}`)
        .setFooter(`ID: ${user.id}`)
        .setThumbnail(user.avatarURL({ size: 4096 }))
        .setTimestamp()
        .setColor(client.config.embedColor)
    channel.send(embed);
}