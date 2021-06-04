const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    startup: function () {
        console.log(chalk.green(`Loading bot...`));
        console.log("");
        console.log(chalk.red(`DbotJS - ${require(`../package.json`).version}`));
        console.log("");
        console.log(chalk.blue(`Created By </Pascal>#4627`));
        console.log(chalk.blue(`© Dotwood Media - 2021`));
        console.log("");
    },

    loadCommands: function (map = `${process.cwd()}/commands`) {
        commandsList = new Discord.Collection();

        console.log("=============== Commands ===============");

        try {
            fs.readdir(map, (err, files) => {
                if (err) console.log(err);
                var jsFiles = files.filter(f => f.split(".").pop() === "js");
                if (jsFiles.length <= 0) {
                    return;
                }
                jsFiles.forEach((f, i) => {
                    const command = require(`${map}/${f}`);
                    console.log(chalk.green(`Loaded`, chalk.bold(`${command.name.toLowerCase()}`), `successfully`))
                    commandsList.set(command.name.toLowerCase(), command);
                })
            });
        }
        catch { }

        try {
            fs.readdirSync(map).forEach(dirs => {
                const commands = fs.readdirSync(`${map}/${dirs}`).filter(files => files.endsWith('.js'));
                if (commands.length <= 0) {
                    return;
                }

                console.log(chalk.green(`Loaded`, chalk.bold(`${commands.length} commands`), `of`, chalk.bold(`${dirs}`), `successfully`))
                for (const file of commands) {
                    const command = require(`${map}/${dirs}/${file}`);
                    commandsList.set(command.name.toLowerCase(), command);
                };
            });
        }
        catch { }

        return commandsList;
    },

    loadEvents: function (map = `${process.cwd()}/events`) {
        try {
            console.log("=============== Events ===============");

            fs.readdirSync(map).forEach(dirs => {
                const events = fs.readdirSync(`${map}/${dirs}`).filter(files => files.endsWith('.js'));
                if (events.length <= 0) {
                    return;
                }

                console.log(chalk.green(`Loaded `, chalk.bold(`${events.length} events `), `of `, chalk.bold(`${dirs} `), `successfully`))

                for (const file of events) {
                    const event = require(`${map}/${dirs}/${file}`);
                    client.on(file.split(".")[0], event.bind(null, client));
                }
            });
        }
        catch {
            console.log(chalk.red(`No map`, chalk.bold(`events`), `found`))
        }
    },
}

// © Dotwood Media | All rights reserved