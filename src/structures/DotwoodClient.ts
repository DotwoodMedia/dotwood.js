import { Client, type ClientOptions } from "discord.js";
import config, { type IClientConfig } from "../config/client";

export class DotwoodClient extends Client {
    public config: IClientConfig | null = null;

    constructor(options: ClientOptions | IClientConfig) {
        super(options as ClientOptions);

        this.config = config(options as IClientConfig) ?? null;
    }

    public override async login(token: string): Promise<any> {
        if (!this.config?.id) throw new Error(`Bot id is required!`);
        if (!this.config?.guildId && !this.config.public) throw new Error(`Guild id is required for private bots!`);

        await super.login(token);
    }

    public get getGuilds() {
        return this.guilds.cache;
    }

    public setId(id: IClientConfig['id']): IClientConfig {
        this.config!.id = id;
        return this.config as IClientConfig;
    }

    public setGuildId(guildId: IClientConfig['guildId']): IClientConfig {
        this.config!.guildId = guildId;
        return this.config as IClientConfig;
    }

    public isPublic(value: IClientConfig['public']): IClientConfig {
        this.config!.public = value;
        return this.config as IClientConfig;
    }

    public setColors(colors: IClientConfig['colors']): IClientConfig {
        this.config!.colors = colors;
        return this.config as IClientConfig;
    }

    public setBrandColor(color: IClientConfig['colors']['brand']): IClientConfig {
        this.config!.colors.brand = color;
        return this.config as IClientConfig;
    }

    public setSuccessColor(color: IClientConfig['colors']['success']): IClientConfig {
        this.config!.colors.success = color;
        return this.config as IClientConfig;
    }

    public setErrorColor(color: IClientConfig['colors']['error']): IClientConfig {
        this.config!.colors.error = color;
        return this.config as IClientConfig;
    }

    public setWarningColor(color: IClientConfig['colors']['warning']): IClientConfig {
        this.config!.colors.warning = color;
        return this.config as IClientConfig;
    }

    public setStatusContent(...content: IClientConfig['status']['content']): IClientConfig {
        this.config!.status.content = content;
        return this.config as IClientConfig;
    }

    public setStatusType(type: IClientConfig['status']['type']): IClientConfig {
        this.config!.status.type = type;
        return this.config as IClientConfig;
    }

    public setCommandsDir(dir: IClientConfig['dirs']['commands']): IClientConfig {
        this.config!.dirs.commands = dir;
        return this.config as IClientConfig;
    }

    public setEventsDir(dir: IClientConfig['dirs']['events']): IClientConfig {
        this.config!.dirs.events = dir;
        return this.config as IClientConfig;
    }
}