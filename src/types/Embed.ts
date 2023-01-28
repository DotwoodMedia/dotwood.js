import { APIEmbed } from "discord.js"

export enum EmbedType {
    Default = "default",
    Success = "success",
    Error = "error",
    Warning = "warning"
}

type CustomEmbed = {
    title?: string;
    description?: string;
    message: string;
    footer: APIEmbed['footer'];
    author: APIEmbed['author'];
}

type EmbedBase<T extends EmbedType, D> = {
    type?: T;
    data: D;
}

export type Embed =
    EmbedBase<EmbedType.Default, APIEmbed> |
    EmbedBase<EmbedType.Error | EmbedType.Success | EmbedType.Warning, CustomEmbed>