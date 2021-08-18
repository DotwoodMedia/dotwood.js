const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    startup: function () {
        console.log(chalk.green(`Loading bot...`));
        console.log("");
        console.log(chalk.red(`Dotwood.js - ${require(`../package.json`).version}`));
        console.log("");
        console.log(chalk.blue(`Created By </Pascal>#0001`));
        console.log(chalk.blue(`© Dotwood Media - 2021`));
        console.log("");
    },

    loadCommands: function (map) {
        try {
            commands = new Discord.Collection();

            fs.readdir(`.${map}`, (err, files) => {
                if (err) console.log(err);
                var jsFiles = files.filter(f => f.split(".").pop() === "js");
                if (jsFiles.length <= 0) {
                    return;
                }
                jsFiles.forEach((f, i) => {
                    const command = require(`${process.cwd()}${map}/${f}`);
                    commands.set(command.name.toLowerCase(), command);
                })
            });

            return commands;
        }
        catch {
            console.log(chalk.red(`No map`, chalk.bold(`${map}`), `found`))
        }
    },

    loadEvents: function (map, client) {
        console.log("=============== Events ===============");

        fs.readdirSync(`${process.cwd()}${map}`).forEach(dirs => {
            const events = fs.readdirSync(`${process.cwd()}${map}/${dirs}`).filter(files => files.endsWith('.js'));
            if (events.length <= 0) {
                return;
            }

            console.log(chalk.green(`Loaded `, chalk.bold(`${events.length} events `), `of `, chalk.bold(`${dirs} `), `successfully`))

            for (const file of events) {
                const event = require(`${process.cwd()}${map}/${dirs}/${file}`);
                client.on(file.split(".")[0], event.bind(null, client));
            }
        });
    },

    loadSlashCommands: function (map, client) {
        const commands = [];
        commandsCol = new Discord.Collection();

        console.log("=============== Interactions ===============");

        fs.readdirSync(`.${map}`).forEach(dirs => {
            const commandFiles = fs.readdirSync(`.${map}`).filter(files => files.endsWith('.js'));
    
            console.log(`\x1b[33mLoaded \x1b[35minteraction \x1b[34m${commandFiles}\x1b[33m \x1b[32msuccessfully \u001b[0m`)
            for (const file of commandFiles) {
                const command = require(`${process.cwd()}/${map}/${file}`);
                commandsCol.set(command.data.name, command);
                commands.push(command.data);
            };

            const rest = new REST({ version: '9' }).setToken(client.config.token);

            (async () => {
                try {
                    await rest.put(
                        Routes.applicationCommands(client.config.id),
                        { body: commands },
                    );
                } catch (error) {
                    console.error(error);
                }
            })();
        });

        return commandsCol;
    },
}

// © Dotwood Media | All rights reserved