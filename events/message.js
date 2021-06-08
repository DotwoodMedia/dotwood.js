const Discord = require('discord.js');

module.exports = async (client, message) => {
    message = client.functions(message, client);
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.prefix;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content.toLowerCase())) return;
    const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

    this.args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    this.command = this.args.shift().toLowerCase();

    const cmd = client.commands.get(this.command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(this.command));

    if (cmd) {
        cmd.run(client, message, this.args).catch(e => {
            return message.error(e, message.channel);
        })
    }
}