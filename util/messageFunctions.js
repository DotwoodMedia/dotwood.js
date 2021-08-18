const Discord = require('discord.js');

module.exports = (message, client) => {
    message.send = (content) => {
        message.channel.send({ content: content });
    }

    message.embeds = (...embeds) => {
        message.channel.send({ embeds: embeds });
    }

    message.embedSuccess = (text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ - Success!`)
            .setDescription(`${text}`)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`© ${message.guild.name} - ${message.author.username}`);
        return embed;
    }

    message.embedError = (text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`❌ - Error!`)
            .setDescription(`${text}`)
            .setColor("#ff0000")
            .setFooter(`© ${message.guild.name} - ${message.author.username}`)
            .setTimestamp();
        return embed;
    }

    message.embed = ({ embed: embed = new Discord.MessageEmbed(), title: title, desc: desc, image: image, color: color, footer: footer }) => {
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (color) embed.setColor(color);
        if (!color) embed.setColor(client.config.embedColor);
        if (footer) embed.setFooter(footer);
        return embed;
    }

    message.buttonSuccess = (label, id) => {
        let button = new Discord.MessageButton()
            .setCustomId(`${id}`)
            .setLabel(`${label}`)
            .setStyle('SUCCESS')
        return button;
    }

    message.buttonDanger = (label, id) => {
        let button = new Discord.MessageButton()
            .setCustomId(`${id}`)
            .setLabel(`${label}`)
            .setStyle('DANGER')
        return button;
    }

    message.buttonLink = (label, url) => {
        let button = new Discord.MessageButton()
            .setLabel(`${label}`)
            .setURL(`${url}`)
            .setStyle('LINK')
        return button;
    }

    message.row = (...components) => {
        const row = new Discord.MessageActionRow()
            .addComponents(components);
        return row;
    }

    message.button = ({ component: button = new Discord.MessageButton(), label: label, style: style, id: id, disabled: disabled }) => {
        if (!label) throw new Error(`Label is required!`);
        if (!(style.toUpperCase() == "PRIMARY") && !(style.toUpperCase() == "SECONDARY")) throw new Error(`No valid style specified!`);
        if (!(disabled.toLowerCase() == "false") && !(disabled.toLowerCase() == "true")) throw new Error(`No valid boolean specified!`);

        if (label) button.setLabel(`${label}`);
        if (style) button.setStyle(`${style}`);
        if (id) button.setCustomId(`${id}`);
        if (disabled) button.setDisabled(`${disabled}`);

        return button;
    }

    message.select = ({ component: select = new Discord.MessageSelectMenu(), placeholder: placeholder, id: id, options: options }) => {
        if (!placeholder) throw new Error(`Placeholder is required!`);
        if (!id) throw new Error(`Id is required!`);
        if (!options) throw new Error(`Options is required!`);

        if (placeholder) select.setPlaceholder(`${placeholder}`);
        if (id) select.setCustomId(`${id}`);
        if (options) select.addOptions([options]);

        return select;
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

    message.hasPermission = (perms) => {
        return message.member.permissions.has(perms);
    }

    message.botHasPermission = (perms) => {
        return message.guild.me.permissions.has(perms);
    }

    return message;
}

// © Dotwood Media | All rights reserved