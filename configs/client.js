module.exports = (config) => {
    return {
        token: config.token,
        id: config.id,
        prefix: config.prefix || "!",
        status: config.status || ["Dotwood.js"],
        statusType: config.statusType !== undefined ? config.statusType.toUpperCase() : "PLAYING",
        embedColor: config.embedColor || "#0000ff",
        slashcommands: config.slashcommands,
        slashcommandsType: config.slashcommandsType,
        commands: config.commands,
        events: config.events
    };
}

// © Dotwood Media | All rights reserved