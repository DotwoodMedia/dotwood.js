const Discord = require('discord.js');

module.exports = {
    codeBlock: function (language, content) {
        return `\`\`\`${language}\n${content}\`\`\``
    },

    inlineCode: function (content) {
        return `\`${content}\``
    },

    italicText: function (content) {
        return `_${content}_`
    },

    boldText: function (content) {
        return `**${content}**`
    },

    strikethroughText: function (content) {
        return `~~${content}~~`
    },

    quoteText: function (content) {
        return `> ${content}`
    },

    blockQuote: function (content) {
        return `>>> ${content}`
    },

    hyperlink: function (content, url) {
        return `[${content}](${url})`
    },

    spoiler: function (content) {
        return `||${content}||`
    },

    userMention: function (id) {
        return `<@!${id}>`
    },

    channelMention: function (id) {
        return `<#${id}>`
    },

    roleMention: function (id) {
        return `<@&${id}>`
    },
}

// © Dotwood Media | All rights reserved