import { Client, Collection, REST, Routes, type ClientOptions } from "discord.js";
import config, { type ClientConfig } from "../config/client";
import { join } from "path";
import { existsSync, readdirSync, statSync } from "node:fs";

export class DotwoodClient extends Client {
    public config: ClientConfig | null = null;
    public commands: any = new Collection();

    constructor(options: ClientOptions | ClientConfig) {
        super(options as ClientOptions);

        this.config = config(options as ClientConfig) ?? null;
    }

    public override async login(token: string): Promise<any> {
        if (!this.config?.id) throw new Error(`Bot id is required!`);
        if (!this.config?.guildId && !this.config.public) throw new Error(`Guild id is required for private bots!`);

        this.loadCommands(token);
        // await super.login(token);
    }

    public get getGuilds() {
        return this.guilds.cache;
    }

    public setId(id: ClientConfig['id']): ClientConfig {
        this.config!.id = id;
        return this.config as ClientConfig;
    }

    public setGuildId(guildId: ClientConfig['guildId']): ClientConfig {
        this.config!.guildId = guildId;
        return this.config as ClientConfig;
    }

    public isPublic(value: ClientConfig['public']): ClientConfig {
        this.config!.public = value;
        return this.config as ClientConfig;
    }

    public setColors(colors: ClientConfig['colors']): ClientConfig {
        this.config!.colors = colors;
        return this.config as ClientConfig;
    }

    public setBrandColor(color: ClientConfig['colors']['brand']): ClientConfig {
        this.config!.colors.brand = color;
        return this.config as ClientConfig;
    }

    public setSuccessColor(color: ClientConfig['colors']['success']): ClientConfig {
        this.config!.colors.success = color;
        return this.config as ClientConfig;
    }

    public setErrorColor(color: ClientConfig['colors']['error']): ClientConfig {
        this.config!.colors.error = color;
        return this.config as ClientConfig;
    }

    public setWarningColor(color: ClientConfig['colors']['warning']): ClientConfig {
        this.config!.colors.warning = color;
        return this.config as ClientConfig;
    }

    public setStatusContent(...content: ClientConfig['status']['content']): ClientConfig {
        this.config!.status.content = content;
        return this.config as ClientConfig;
    }

    public setStatusType(type: ClientConfig['status']['type']): ClientConfig {
        this.config!.status.type = type;
        return this.config as ClientConfig;
    }

    public setCommandsDir(dir: ClientConfig['dirs']['commands']): ClientConfig {
        this.config!.dirs.commands = dir;
        return this.config as ClientConfig;
    }

    public setEventsDir(dir: ClientConfig['dirs']['events']): ClientConfig {
        this.config!.dirs.events = dir;
        return this.config as ClientConfig;
    }

    private loadCommands(token: string) {
        if (!this.config?.dirs.commands) throw new Error(`No commands map path found!`);

        const commandsPath = join(process.cwd(), this.config!.dirs.commands);
        if (!existsSync(commandsPath)) throw new Error(`No folder was found with this path`);

        const commands: any = [];

        readdirSync(commandsPath).forEach(dir => {
            const dirPath = join(commandsPath, dir);
            const stat = statSync(dirPath);
            if (stat.isFile()) {
                const command = require(`${process.cwd()}/${dir}`);
                this.commands.set(command.data.name, command);
                commands.push(command.data);
            }
            else {
                const commandFiles = readdirSync(`${commandsPath}/${dir}`).filter(files => files.endsWith('.js') || files.endsWith('.ts'));
                for (const file of commandFiles) {
                    const command = require(`${process.cwd()}/${dir}/${file}`);
                    this.commands.set(command.data.name, command);
                    commands.push(command.data);
                };
            }
        });

        const rest = new REST({ version: '10' }).setToken(token);

        (async () => {
            try {
                const data = await rest.put(
                    this.config?.public ? Routes.applicationCommands(this.config!.id) : Routes.applicationGuildCommands(this.config!.id, this.config!.guildId),
                    { body: commands },
                );
            } catch (error) {
                console.error(error);
            }
        })();
    }
}