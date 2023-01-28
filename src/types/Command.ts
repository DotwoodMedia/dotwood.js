import { ChatInputApplicationCommandData, CommandInteraction, Message } from "discord.js";
import { DotwoodClient } from "../structures/DotwoodClient";

export enum CommandType {
    Message = "message",
    Interaction = "interaction"
}

type MessageCommandData = {
    name: string;
    aliases?: string[];
    description?: string;
}

type CommandBase<T extends CommandType, D, E> = {
    type: T;
    data: D;
    execute: E;
}

type ExecuteFunctionInteraction = (client: DotwoodClient, interaction: CommandInteraction) => void;
type ExecuteFunctionMessage = (client: DotwoodClient, message: Message, args?: string[]) => void;

export type Command =
    CommandBase<CommandType.Interaction, ChatInputApplicationCommandData, ExecuteFunctionInteraction> |
    CommandBase<CommandType.Message, MessageCommandData, ExecuteFunctionMessage>