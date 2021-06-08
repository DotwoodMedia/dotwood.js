const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = (message, client) => {
    message.success = (text, channel) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ - Success!`)
            .setDescription(`${text}`)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`© ${message.guild.name} - ${message.author.username}`);
        return channel.send(embed)
    }

    message.error = (text, channel) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`❌ - Error!`)
            .setDescription(`${text}`)
            .setColor("#ff0000")
            .setFooter(`© ${message.guild.name} - ${message.author.username}`)
            .setTimestamp();
        return channel.send(embed)
    }

    message.send = ({ embed: embed = new Discord.MessageEmbed(), title: title, desc: desc, image: image, color: color, footer: footer }, channel) => {
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (color) embed.setColor(color);
        if (footer) embed.setFooter(footer);
        return channel.send(embed)
    }

    message.getMember = (member) => {
        return message.mentions.members.first() || message.guild.members.cache.get(member);
    }

    message.getChannel = (channel) => {
        return message.mentions.channels.first() || message.guild.channels.cache.get(channel);
    }

    message.getRole = (role) => {
        return message.mentions.roles.first() || message.guild.roles.cache.get(role);
    }

    message.member.isAdmin = () => {
        if (message.member.hasPermission("ADMINISTRATOR")) return true;
    }

    message.member.isOwner = () => {
        if (message.guild.ownerID == message.author.id) return true;
    }
}

// © Dotwood Media | All rights reserved