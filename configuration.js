module.exports = (config) => {
    return {
        token: config.token,
        prefix: config.prefix || "!",
        status: config.status || ["Dotwood.js"],
        statusType: config.statusType !== undefined ? config.statusType.toUpperCase() : "PLAYING",
        embedColor: config.embedColor || "#0000ff",
        commands: config.commands || true,
        events: config.events || true,
    };
}

// © Dotwood Media | All rights reserved