| :exclamation: Dotwood.js V3 is not published yet!  :exclamation: |
| ---------------------------------------------------------------- |


# Dotwood.js - Discord Bot Framework
[![downloadsBadge](https://img.shields.io/npm/dt/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)
[![versionBadge](https://img.shields.io/npm/v/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)

Dotwood.js is a framework for building Discord bots using JavaScript and the [discord.js](https://github.com/discordjs/discord.js) library. It aims to provide an easy and organized way to create, manage, and deploy your bots.

- **Discord.js:** 14.7.1 
- **Node.js:** 16.9.0 or newer
# 💻 - Installation
**Node.js 16.9.0 or newer is required.**

```
npm install dotwood.js@dev discord.js@14.x
```

# 📖 - Example (outdated)
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
- Support server: #SOON
- Documentation: https://docs.dotwood.media/
- Website Dotwood Media: https://dotwood.media/

# 📑- License
This project has an <a href="https://github.com/DotwoodMedia/dotwood.js/blob/main/LICENSE">Apache 2.0</a> license
