const Discord = require("discord.js");
const fetch = require("node-fetch");

class poker {
    constructor(settings = {}) {
        this.settings = settings;

        this.settings.channel = this.settings.channel;
        this.settings.token = this.settings.token;

        if (!this.settings.channel || this.settings.channel == undefined || this.settings.channel == "") {
            throw new Error(`Channel is required!`);
        }

        if (!this.settings.token || this.settings.token == undefined || this.settings.token == "") {
            throw new Error(`Token is required!`);
        }

        if (this.settings.channel.type !== "GUILD_VOICE") throw new Error(`No valid voice channel!`);

        return new Promise(async (ful, rej) => {
            try {
                const res = await fetch(`https://discord.com/api/v8/channels/${this.settings.channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${this.settings.token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res) rej("An error occured!");

                ful(res.json());
            } catch (err) {
                rej(err);
            }
        });

    }
}

module.exports = poker;