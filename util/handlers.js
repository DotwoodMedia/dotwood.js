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

            fs.readdirSync(`.${map}`).forEach(dirs => {
                try {
                    const commandsFile = fs.readdirSync(`${process.cwd()}${map}/${dirs}`).filter(files => files.endsWith('.js'));

                    for (const file of commandsFile) {
                        const command = require(`${process.cwd()}${map}/${dirs}/${file}`);
                        commands.set(command.name.toLowerCase(), command);
                    };
                }
                catch { }
            });

            return commands;
        }
        catch {
            console.log(chalk.bold(`[ Dotwood.js ]`), chalk.red(`No map`, chalk.bold(`${map}`), `found`))
        }
    },

    loadEvents: function (map, client) {
        console.log("=============== Events ===============");

        fs.readdirSync(`${process.cwd()}${map}`).forEach(dirs => {
            const events = fs.readdirSync(`${process.cwd()}${map}/${dirs}`).filter(files => files.endsWith('.js'));
            if (events.length <= 0) {
                return;
            }

            console.log(chalk.bold(`[ Dotwood.js ]`), chalk.green(`Loaded `, chalk.bold(`${events.length} events `), `of `, chalk.bold(`${dirs} `), `successfully`))

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

            console.log(chalk.bold(`[ Dotwood.js ]`), `\x1b[33mLoaded \x1b[35minteraction \x1b[34m${commandFiles}\x1b[33m \x1b[32msuccessfully \u001b[0m`)
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

    loadGuildSlashCommands: function (map, id, client) {
        const commands = [];
        commandsCol = new Discord.Collection();

        console.log("=============== Interactions ===============");

        fs.readdirSync(`.${map}`).forEach(dirs => {
            const commandFiles = fs.readdirSync(`.${map}`).filter(files => files.endsWith('.js'));

            console.log(chalk.bold(`[ Dotwood.js ]`), `\x1b[33mLoaded \x1b[35minteraction \x1b[34m${commandFiles}\x1b[33m \x1b[32msuccessfully \u001b[0m`)
            for (const file of commandFiles) {
                const command = require(`${process.cwd()}/${map}/${file}`);
                commandsCol.set(command.data.name, command);
                commands.push(command.data);
            };

            const rest = new REST({ version: '9' }).setToken(client.config.token);

            (async () => {
                try {
                    await rest.put(
                        Routes.applicationGuildCommands(client.config.id, id),
                        { body: commands },
                    );
                } catch (error) {
                    console.error(error);
                }
            })();
        });

        return commandsCol;
    },

    checkForUpdates: function () {
        const package = require('../../../package.json');
        const vLatest = require('../package.json').version;

        if (package.dependencies['dotwood.js']) {
            if (vLatest !== package.dependencies['dotwood.js'].slice(1)) {
                console.log(chalk.bold(`[ Dotwood.js ]`), `new version of Dotwood.js is available! run ${chalk.green('npm i dotwood.js@latest')} to update`)
            }
        } else if (package.devDependencies['dotwood.js']) {
            if (vLatest !== package.devDependencies['dotwood.js'].slice(1)) {
                onsole.log(chalk.bold(`[ Dotwood.js ]`), `new version of Dotwood.js is available! run ${chalk.green('npm i dotwood.js@latest')} to update`)
            }
        }
    },
}

// © Dotwood Media | All rights reserved