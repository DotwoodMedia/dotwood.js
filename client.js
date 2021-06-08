const Discord = require("discord.js");
const chalk = require('chalk');

class DotwoodClient extends Discord.Client {
    constructor(settings = {}) {
        super(settings);

        this.config = require("./configuration")(settings);
        this.functions = require("./util/functions");
        this.handler = require("./util/handlers");

        this.config.token = this.config.token ? this.config.token : undefined;
        if (this.config.token == undefined || this.config.token == "") return console.log(chalk.red(chalk.bold("(Dotwood.js)") + " Bot token is required!"));

        this.config.prefix = this.config.prefix ? this.config.prefix : undefined;
        if (this.config.prefix == undefined || this.config.prefix == "") return console.log(chalk.red(chalk.bold("(Dotwood.js)") + " Bot prefix is required!"));

        if (this.config.commands == true) this.commands = this.handler.loadCommands();
        if (this.config.events == true) this.handler.loadEvents();

        super.on("ready", () => {
            console.log(chalk.green(`${this.user.username} is ready to use! Loaded ${this.commands.size} commands`));

            setInterval(() => {
                let text = this.config.status;
                const randomText = text[Math.floor(Math.random() * text.length)];

                this.user.setActivity(randomText, { type: this.config.statusType });
            }, 50000)
        });

        const messageEvent = require(`./events/message.js`);
        this.on("message", messageEvent.bind(null, this));
    }

    async login() {
        this.handler.startup();
        await super.login(this.config.token);
    }

    async destroy() {
        return this.destroy();
    }

    async getGuilds() {
        return this.guilds.cache;
    }

    async messageDelete(channelID) {
        this.on("messageDelete", async (message) => {
            const channel = this.channels.cache.get(channelID);
            require("./events/messageDelete.js")(this, message, channel);
        });
    }

    async messageUpdate(channelID) {
        this.on("messageUpdate", async (oldMessage, newMessage) => {
            const channel = this.channels.cache.get(channelID);
            require("./events/messageUpdate.js")(this, oldMessage, newMessage, channel);
        });
    }

    async banAdd(channelID) {
        this.on("guildBanAdd", async (guild, user) => {
            const channel = this.channels.cache.get(channelID);
            require("./events/guildBanAdd.js")(this, guild, user, channel);
        });
    }

    async banRemove(channelID) {
        this.on("guildBanRemove", async (guild, user) => {
            const channel = this.channels.cache.get(channelID);
            require("./events/guildBanRemove.js")(this, guild, user, channel);
        });
    }
}

module.exports = DotwoodClient;

// © Dotwood Media | All rights reserved