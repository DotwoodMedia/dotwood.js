const Discord = require("discord.js");
const axios = require("axios");

class chatBot {
    constructor(settings = {}) {
        this.settings = settings;

        this.settings.message = this.settings.message;
        this.settings.input = this.settings.input;
        this.settings.uuid = this.settings.uuid;

        if (!this.settings.message || this.settings.message == undefined || this.settings.message == "") {
            throw new Error(`Message component is required!`);
        }

        if (!this.settings.input || this.settings.input == undefined || this.settings.input == "") {
            throw new Error(`Input text is required!`);
        }

        return new Promise(async (ful, rej) => {
            try {
                const res = await axios.get(
                    `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(this.settings.input)}&uid=${this.settings.uuid || this.settings.message.author.id
                    }`
                );

                if (!res.data) rej("An error occured!");

                ful(res.data);
            } catch (err) {
                rej(err);
            }
        });

    }
}

module.exports = chatBot;