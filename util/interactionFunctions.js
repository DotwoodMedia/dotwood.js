const Discord = require('discord.js');

module.exports = (interaction, client) => {
    interaction.privateReply = (content) => {
        if (content.type == "rich") {
            interaction.reply({ embeds: [content], ephemeral: true });
        }
        else {
            interaction.reply({ content: `${content}`, ephemeral: true });
        }
    }

    interaction.send = (content) => {
        interaction.channel.send({ content: content });
    }

    interaction.embeds = (...embeds) => {
        interaction.channel.send({ embeds: embeds });
    }

    interaction.embedSuccess = (text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ - Success!`)
            .setDescription(`${text}`)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`© ${interaction.guild.name} - ${interaction.author.username}`);
        return embed;
    }

    interaction.embedError = (text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`❌ - Error!`)
            .setDescription(`${text}`)
            .setColor("#ff0000")
            .setFooter(`© ${interaction.guild.name} - ${interaction.author.username}`)
            .setTimestamp();
        return embed;
    }

    interaction.embed = ({ embed: embed = new Discord.MessageEmbed(), title: title, desc: desc, image: image, color: color, footer: footer }) => {
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        if (image) embed.setImage(image);
        if (color) embed.setColor(color);
        if (!color) embed.setColor(client.config.embedColor);
        if (footer) embed.setFooter(footer);
        return embed;
    }

    interaction.buttonSuccess = (label, id) => {
        let button = new Discord.MessageButton()
            .setCustomId(`${id}`)
            .setLabel(`${label}`)
            .setStyle('SUCCESS')
        return button;
    }

    interaction.buttonDanger = (label, id) => {
        let button = new Discord.MessageButton()
            .setCustomId(`${id}`)
            .setLabel(`${label}`)
            .setStyle('DANGER')
        return button;
    }

    interaction.buttonLink = (label, url) => {
        let button = new Discord.MessageButton()
            .setLabel(`${label}`)
            .setURL(`${url}`)
            .setStyle('LINK')
        return button;
    }

    interaction.row = (...components) => {
        const row = new Discord.MessageActionRow()
            .addComponents(components);
        return row;
    }

    interaction.button = ({ component: button = new Discord.MessageButton(), label: label, style: style, id: id, disabled: disabled }) => {
        if (!label) throw new Error(`Label is required!`);
        if (!(style.toUpperCase() == "PRIMARY") && !(style.toUpperCase() == "SECONDARY")) throw new Error(`No valid style specified!`);
        if (!(disabled.toLowerCase() == "false") && !(disabled.toLowerCase() == "true")) throw new Error(`No valid boolean specified!`);

        if (label) button.setLabel(`${label}`);
        if (style) button.setStyle(`${style}`);
        if (id) button.setCustomId(`${id}`);
        if (disabled) button.setDisabled(`${disabled}`);

        return button;
    }

    interaction.select = ({ component: select = new Discord.MessageSelectMenu(), placeholder: placeholder, id: id, options: options }) => {
        if (!placeholder) throw new Error(`Placeholder is required!`);
        if (!id) throw new Error(`Id is required!`);
        if (!options) throw new Error(`Options is required!`);

        if (placeholder) select.setPlaceholder(`${placeholder}`);
        if (id) select.setCustomId(`${id}`);
        if (options) select.addOptions([options]);

        return select;
    }

    interaction.getMember = (member) => {
        return interaction.mentions.members.first() || interaction.guild.members.cache.get(member);
    }

    interaction.getChannel = (channel) => {
        return interaction.mentions.channels.first() || interaction.guild.channels.cache.get(channel);
    }

    interaction.getRole = (role) => {
        return interaction.mentions.roles.first() || interaction.guild.roles.cache.get(role);
    }

    interaction.hasPermission = (perms) => {
        return interaction.member.permissions.has(perms);
    }

    interaction.botHasPermission = (perms) => {
        return interaction.guild.me.permissions.has(perms);
    }

    return interaction;
}

// © Dotwood Media | All rights reserved