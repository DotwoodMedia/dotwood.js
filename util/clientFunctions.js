const Discord = require('discord.js');
const Voice = require('@discordjs/voice');
const { createDiscordJSAdapter } = require('./VoiceAdapter');

module.exports = (client) => {
    client.awaitReply = async (msg, limit, user) => {
        const filter = m => m.author.id === user.id;

        try {
            const collected = await msg.channel.awaitMessages({ filter, max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    client.awaitComponent = async (msg, limit, user) => {
        const filter = m => m.user.id === user.id;

        try {
            const collected = await msg.channel.awaitMessageComponent({ filter, max: 1, time: limit });

            console.log(collected)
        } catch (e) {
            return false;
        }
    };

    client.awaitReaction = async (msg, max, limit, user, reaction) => {
        let reactions = reaction;
        const filter = (r, user) => reactions.includes(r.emoji.name) && user.id == user.id;

        if (typeof reaction == "string") reactions = [reaction];
        reactions.forEach(async r => await msg.react(r));

        return msg.awaitReactions({ filter, max: max || 1, time: limit }).then(collected => collected.first() && collected.first().emoji.name);
    };

    client.createVoice = async function (channel = Discord.VoiceChannel) {
        const connection = Voice.joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: createDiscordJSAdapter(channel),
        });

        try {
            await Voice.entersState(connection, Voice.VoiceConnectionStatus.Ready, 30e3);

            setTimeout(() => {
                if (channel.type == "GUILD_STAGE_VOICE") {
                    channel.guild.me.voice.setSuppressed(false);
                }
            }, 500)

            return connection;
        } catch (error) {
            connection.destroy();
            console.log(error);
        }
    }

    client.createPlayer = () => {
        const player = Voice.createAudioPlayer();
        return player;
    }

    client.createAudioSource = async function (source) {
        const resource = Voice.createAudioResource(source, { inputType: Voice.StreamType.Opus, inlineVolume: true });
        return resource;
    }
}

// © Dotwood Media | All rights reserved