const Discord = require("discord.js");

class contextMenu {
    constructor(settings = {}) {
        this.settings = settings

        this.settings.name = this.settings.name;
        this.settings.type = this.settings.type;

        if (!this.settings.name || this.settings.name == undefined || this.settings.name == "") {
            throw new Error(`Context menu name is required!`);
        }

        if (!this.settings.type || this.settings.type == undefined || this.settings.type == "") {
            throw new Error(`Context menu type is required!`);
        }
        

        if (this.settings.type.toUpperCase() == "USER") {
            var data = [{
                name: this.settings.name,
                type: 2,
            }]
    
            return data[0];
        }
        else if (this.settings.type.toUpperCase() == "MESSAGE") {
            var data = [{
                name: this.settings.name,
                type: 3,
            }]
    
            return data[0];
        }
        else {
            throw new Error(`Not a valid menu type!`);
        }
    }
}

module.exports = contextMenu;