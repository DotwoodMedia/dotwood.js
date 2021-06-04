const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
    success: async function (text, channel, message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ - Success!`)
            .setDescription(`${text}`)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`© ${message.guild.name} - ${message.author.username}`);
        await channel.send(embed);
    },

    error: async function (text, channel, message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`❌ - Error!`)
            .setDescription(`${text}`)
            .setColor("#ff0000")
            .setFooter(`© ${message.guild.name} - ${message.author.username}`)
            .setTimestamp();
        await channel.send(embed);
    },

    send: async function ({ embed: embed = new Discord.MessageEmbed(), title: title, desc: desc, image: image, color: color, footer: footer }, channel, message) {
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (color) embed.setColor(color);
        if (footer) embed.setFooter(footer);
        await channel.send(embed);
    },
}

// © Dotwood Media | All rights reserved