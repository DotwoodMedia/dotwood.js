const Discord = require("discord.js");
const chalk = require('chalk');

class DotwoodClient extends Discord.Client {
    constructor(settings = {}) {
        super(settings);

        this.config = require("./configs/client")(settings);
        this.messageFunctions = require("./util/messageFunctions");
        this.interactionFunctions = require("./util/interactionFunctions");
        this.handler = require("./util/handlers");

        require("./util/clientFunctions")(this);

        this.config.token = this.config.token ? this.config.token : undefined;
        if (this.config.token == undefined || this.config.token == "") throw new Error(`Bot token is required!`);

        this.config.id = this.config.id ? this.config.id : undefined;
        if (this.config.id == undefined || this.config.id == "") throw new Error(`Bot id is required!`);

        this.config.prefix = this.config.prefix ? this.config.prefix : undefined;
        if (this.config.prefix == undefined || this.config.prefix == "") throw new Error(`Bot prefix is required!`);

        super.on("ready", () => {
            if (!this.config.commands) console.log(chalk.green(`${this.user.username} is ready to use on ${this.getGuilds().size} servers!`));
            if (this.config.commands) console.log(chalk.green(`${this.user.username} is ready to use on ${this.getGuilds().size} servers! Loaded ${this.commands.size} commands`));

            setInterval(() => {
                let text = this.config.status;
                const randomText = text[Math.floor(Math.random() * text.length)];

                this.user.setActivity(randomText, { type: this.config.statusType });
            }, 50000)
        });

        if (this.config.commands) this.commands = this.handler.loadCommands(this.config.commands);
        if (this.config.events) this.handler.loadEvents(this.config.events, this);
        if (this.config.slashcommands && (this.config.slashcommandsType && this.config.slashcommandsType == "ALL")) this.slashCommands = this.handler.loadSlashCommands(this.config.slashcommands, this);
        if (this.config.slashcommands && (this.config.slashcommandsType && this.config.slashcommandsType !== "ALL")) this.slashCommands = this.handler.loadGuildSlashCommands(this.config.slashcommands, this.config.slashcommandsType, this);
        if (this.config.slashcommands && !this.config.slashcommandsType) throw new Error(`Slash commands type is required!`);

        const messageEvent = require(`dotwood.js/events/messageCreate`);
        this.on("messageCreate", messageEvent.bind(null, this));

        const interactionEvent = require(`dotwood.js/events/interactionCreate`);
        this.on("interactionCreate", interactionEvent.bind(null, this));
    }

    async login() {
        this.handler.startup();

        await super.login(this.config.token);

        this.config.id = this.user.id;
    }

    getGuilds() {
        return this.guilds.cache;
    }

    setPrefix(prefix) {
        this.config.prefix = prefix;
        return this;
    }

    setStatus(status) {
        this.config.status = status;
        return this;
    }

    setStatusType(statusType) {
        this.config.statusType = statusType;
        return this;
    }

    setEmbedColor(color) {
        this.config.embedColor = color;
        return this;
    }
}

module.exports = DotwoodClient;