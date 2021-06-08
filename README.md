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

3. Make a commands folder with the name: "commands". Example:
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
message.send({
    title: "hey!",
    desc: "pong!",
    color: "#0000ff"
},  message.channel) 

// All options: title, desc, image, color, footer
```

- Error embed:
```
message.error("This is a error embed!", message.channel);
```

- Success embed:
```
message.success("This is a success embed!", message.channel);
```

## logs
- Message deleted <br />
Notify me when a message is deleted
```
client.messageDelete(ID);
```
Enter the ID of the logs channel at ID

- Message updated <br />
Notify me when a message is edited
```
client.messageUpdate(ID);
```
Enter the ID of the logs channel at ID

- Ban add <br />
Notify me when someone gets banned
```
client.banAdd(ID);
```
Enter the ID of the logs channel at ID

- Ban remove <br />
Notify me when someone is no longer banned
```
client.banRemove(ID);
```
Enter the ID of the logs channel at ID

## Other
- getMember():
```
message.getMember(args[0]);
```

- getChannel():
```
message.getChannel(args[0]);
```

- getRole():
```
message.getRole(args[0]);
```

- isAdmin():
```
message.member.isAdmin();
```

- isOwner():
```
message.member.isOwner(message);
```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/dotwood.js/blob/main/LICENSE">Apache 2.0</a> license
