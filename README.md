| :exclamation:  We are currently working on a new better version!   |
|-----------------------------------------|

# Dotwood.js
This framework makes creating a bot much easier! With this module you can create a good basis for bot

[![downloadsBadge](https://img.shields.io/npm/dt/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)
[![versionBadge](https://img.shields.io/npm/v/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)

# ℹ️ - About

Dotwood.js makes creating a bot even easier! With a few simple lines of code you can build your own bot very quickly
- Discord.js version: V13.2.0
- Simple functions

# 💻 - Installation
**Node.js 16.6.0 or newer is required.**

```
npm install dotwood.js
```

# 📖 - Example
```
const Dotwood = require("dotwood.js");
const Discord = require('discord.js');

const client = new Dotwood.Client({
    token: "TOKEN", // Bot token
    id: "ID", // Bot id
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'], // Discord partials
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ], // Discord intents
})

client.setPrefix("!"); // Bot prefix > !help, !test
client.login();
```

# 🔗 - Links
- Discord: https://discord.gg/dbot
- Documentation: https://docs.dotwood.media/

# 📑- License
This project has an <a href="https://github.com/DotwoodMedia/dotwood.js/blob/main/LICENSE">Apache 2.0</a> license
