# Dotwood.js
This framework makes creating a bot much easier! With this module you can create a good basis for bot

[![downloadsBadge](https://img.shields.io/npm/dt/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)
[![versionBadge](https://img.shields.io/npm/v/dotwood.js?style=for-the-badge)](https://npmjs.com/dotwood.js)

# 💻 Installation

1. Install module: `npm install dotwood.js`
2. Make a index.js file. Example:
```
const Dotwood = require("dotwood.js");

let client = new Dotwood.Client({
    prefix: "!", // Bot prefix > !help, !test
    token: "TOKEN" // Bot token
})

client.login();
```

3. Make a coomands folder with the name: "commands". Example:
``` 
module.exports = {
    name: 'ping',
    description: 'See the bots ping in ms',
    category: 'Example',

    run: async (client, message, args) => {
        // Code here
    },
};
```

# ⚙ Options
```
new Dotwood.Client({
    prefix: "!", // Bot prefix > !help, !test
    token: "TOKEN" // Bot token
    status: ["Dotwood.js"], // Bot status
    statusType: "PLAYING", // Bot status type
    embedColor: "#0000ff", // Color of a embed
    commands: true, // enable or disable commands
    events: true // enable or disable events
})
```

# 🤖 All functions
## Embeds
- Send embed:
```
client.embed.send({
    title: "hey!",
    desc: "pong!",
    color: "#0000ff"
},  message.channel, message) 

// All options: title, desc, image, color, footer
```

- Error embed:
```
client.embed.error("This is a error embed!", message.channel, message);
```

- Success embed:
```
client.embed.success("This is a success embed!", message.channel, message);
```

## Other
- getMember():
```
client.function.getMember(message, args[0]);
```

- getChannel():
```
client.function.getChannel(message, args[0]);
```

- getRole():
```
client.function.getRole(message, args[0]);
```

- isAdmin():
```
client.function.isAdmin(message);
```

- isOwner():
```
client.function.isOwner(message);
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/dotwood.js/blob/main/LICENSE">Apache 2.0</a> license
