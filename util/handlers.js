const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    startup: function () {
        console.log(chalk.green(`Loading bot...`));
        console.log("");
        console.log(chalk.red(`Dotwood.js - ${require(`../package.json`).version}`));
        console.log("");
        console.log(chalk.blue(`Created By </Pascal>#4627`));
        console.log(chalk.blue(`© Dotwood Media - 2021`));
        console.log("");
    },

    loadCommands: function (map = `${process.cwd()}/commands`) {
        commands = new Discord.Collection();

        fs.readdir("./commands", (err, files) => {
            if (err) console.log(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if (jsFiles.length <= 0) {
                return;
            }
            jsFiles.forEach((f, i) => {
                const command = require(`${map}/${f}`);
                commands.set(command.name.toLowerCase(), command);
            })
        });

        return commands;
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