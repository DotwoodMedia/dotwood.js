import { PresenceStatus } from "discord.js";

export type IClientConfig = {
    id: string;
    guildId: string;
    public: boolean;
    colors: {
        brand: string;
        success: string;
        error: string;
        warning: string;
    };
    status: {
        content: string[];
        type: PresenceStatus;
    };
    dirs: {
        commands: string;
        events: string;
    }
}

export default (config: IClientConfig): IClientConfig => {
    return {
        id: config.id,
        guildId: config.guildId,
        public: config.public || false,
        colors: {
            brand: config.colors?.brand || '#5865F2',
            success: config.colors?.success || '#57F287',
            error: config.colors?.error || '#ED4245',
            warning: config.colors?.warning || '#FF9A00'
        },
        status: {
            content: config.status?.content || ["Dotwood.js", "https://www.npmjs.com/package/dotwood.js"],
            type: config.status?.type || 'online'
        },
        dirs: {
            commands: config.dirs?.commands || '/commands',
            events: config.dirs?.events || '/events'
        }
    }
}