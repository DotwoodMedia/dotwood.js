const Discord = require("discord.js");
const chalk = require('chalk');

class DBOTClient extends Discord.Client {
    constructor(settings = {}) {
        super(settings);

        this.config = require("./configuration")(settings);
        this.embed = require("./util/embeds");
        this.function = require("./util/functions");
        this.handler = require("./util/handlers");

        this.config.token = this.config.token ? this.config.token : undefined;
        if (this.config.token == undefined || this.config.token == "") return console.log(chalk.red(chalk.bold("(DbotJS)") + " Bot token is required!"));

        this.config.prefix = this.config.prefix ? this.config.prefix : undefined;
        if (this.config.prefix == undefined || this.config.prefix == "") return console.log(chalk.red(chalk.bold("(DbotJS)") + " Bot prefix is required!"));

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
}

module.exports = DBOTClient;

// © Dotwood Media | All rights reserved