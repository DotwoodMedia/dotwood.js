const Discord = require("discord.js");

class contextMenu {
    constructor(settings = {}) {
        this.settings = settings

        this.settings.name = this.settings.name;
        this.settings.desc = this.settings.desc;

        if (!this.settings.name || this.settings.name == undefined || this.settings.name == "") {
            throw new Error(`Slash command name is required!`);
        }

        if (!this.settings.desc || this.settings.desc == undefined || this.settings.desc == "") {
            throw new Error(`Slash command description is required!`);
        }

        var data = [{
            name: this.settings.name,
            description: this.settings.desc,
        }]

        return data[0];
    }
}

module.exports = contextMenu;