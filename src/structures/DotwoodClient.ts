import { Client, Collection, REST, Routes, type ClientOptions, PresenceStatus, Embed } from "discord.js";
import { join } from "node:path";
import { existsSync, readdirSync, statSync } from "node:fs";

import config, { type ClientConfig } from "../config/client";

export class DotwoodClient extends Client {
    public readonly data: ClientConfig;
    public readonly commands: any = new Collection();

    constructor(data: ClientOptions | ClientConfig = {}) {
        super(data as ClientOptions);

        this.data = config(data as ClientConfig) ?? null;
    }

    public override async login(token: string): Promise<any> {
        if (!this.data.id) throw new Error(`Bot id is required!`);
        if (!this.data.guildId && !this.data.public) throw new Error(`Guild id is required for private bots!`);

        this.loadCommands(token);
        this.loadEvents();

        await super.login(token);
    }

    public get getGuilds() {
        return this.guilds.cache;
    }

    public setId(id: string): ClientConfig {
        this.data.id = id ?? undefined;
        return this.data;
    }

    public setGuildId(guildId: string): ClientConfig {
        this.data.guildId = guildId ?? undefined;
        return this.data;
    }

    public isPublic(value: boolean): ClientConfig {
        this.data.public = value ?? undefined;
        return this.data;
    }

    public setColors(colors: ClientConfig['colors']): ClientConfig {
        this.data.colors = colors ?? undefined;
        return this.data;
    }

    public setBrandColor(color: string): ClientConfig {
        this.data.colors!.brand = color ?? undefined;
        return this.data;
    }

    public setSuccessColor(color: string): ClientConfig {
        this.data.colors!.success = color ?? undefined;
        return this.data;
    }

    public setErrorColor(color: string): ClientConfig {
        this.data.colors!.error = color ?? undefined;
        return this.data;
    }

    public setWarningColor(color: string): ClientConfig {
        this.data.colors!.warning = color ?? undefined;
        return this.data;
    }

    public setStatusContent(...content: string[]): ClientConfig {
        this.data.status!.content = content ?? [];
        return this.data;
    }

    public setStatusType(type: PresenceStatus): ClientConfig {
        this.data.status!.type = type ?? undefined;
        return this.data;
    }

    public setCommandsDir(dir: string): ClientConfig {
        this.data.dirs!.commands = dir ?? undefined;
        return this.data;
    }

    public setEventsDir(dir: string): ClientConfig {
        this.data.dirs!.events = dir ?? undefined;
        return this.data;
    }

    private loadCommands(token: string): void {
        if (!this.data.dirs?.commands) throw new Error(`No commands map path found!`);

        const commandsPath = join(process.cwd(), this.data.dirs.commands);
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
                    this.data.public ? Routes.applicationCommands(this.data.id as string) : Routes.applicationGuildCommands(this.data.id as string, this.data.guildId as string),
                    { body: commands },
                );
            } catch (error) {
                console.error(error);
            }
        })();
    }

    private loadEvents(): void {
        if (!this.data.dirs?.events) throw new Error(`No events map path found!`);

        const eventsPath = join(process.cwd(), this.data.dirs.commands);
        if (!existsSync(eventsPath)) throw new Error(`No folder was found with this path`);

        readdirSync(eventsPath).forEach(dir => {
            const dirPath = join(eventsPath, dir);
            const stat = statSync(dirPath);
            if (stat.isFile()) {
                const event = require(`${process.cwd()}/${dir}`);
                this.on(dir.split(".")[0], event.bind(null, this));
            }
            else {
                const events = readdirSync(`${eventsPath}/${dir}`).filter(files => files.endsWith('.js') || files.endsWith('.ts'));
                for (const file of events) {
                    const event = require(`${process.cwd()}/${dir}/${file}`);
                    this.on(file.split(".")[0], event.bind(null, this));
                };
            }
        })
    }
}