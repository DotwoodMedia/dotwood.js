const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
    getMember: function (message, member) {
        return message.mentions.members.first() || message.guild.members.cache.get(member);
    },

    getChannel: function (message, channel) {
        return message.mentions.channels.first() || message.guild.channels.cache.get(channel);
    },

    getRole: function (message, role) {
        return message.mentions.roles.first() || message.guild.roles.cache.get(role);
    },

    isAdmin: function (message) {
        if (message.member.hasPermission("ADMINISTRATOR")) return true;
    },

    isOwner: function (message) {
        if (message.guild.ownerID == message.author.id) return true;
    },
}

// © Dotwood Media | All rights reserved