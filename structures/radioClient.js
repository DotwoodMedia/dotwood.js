const Discord = require("discord.js");

class radioClient {
    constructor(settings = {}) {
        this.settings = settings;

        this.settings.client = this.settings.client ? this.settings.client : undefined;
        if (this.settings.client == undefined || this.settings.client == "") throw new Error(`Client is required!`);

        this.settings.radio = this.settings.radio ? this.settings.radio : undefined;
        if (this.settings.radio == undefined || this.settings.radio == "") throw new Error(`Radio url is required!`);

        this.settings.channel = this.settings.channel ? this.settings.channel : undefined;
        if (this.settings.channel == undefined || this.settings.channel == "") throw new Error(`Default join channel is required!`);
    }

    async play() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_STAGE_VOICE') throw new Error(`No valid voice channel specified!`);

        const player = client.createPlayer();
        const resource = await client.createAudioSource(this.settings.radio);

        player.play(resource);

        const voice = await client.createVoice(channel).catch(err => client.emit('radioErr', err)).then(client.emit('radioON', channel));
        player.subscribe(voice)
    }

    async destroy() {
        const client = this.settings.client;

        const channel = client.channels.cache.get(this.settings.channel);
        if (channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_STAGE_VOICE') throw new Error(`No valid voice channel specified!`);

        const voice = await client.createVoice(channel).catch(err => client.emit('radioErr', err));
        voice.destroy().then(client.emit('radioOFF', channel));
    }
}

module.exports = radioClient;