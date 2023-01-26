import { Invite } from "discord.js";
import { ActivityConfig } from "../types/Activity";
import axios from "axios";

export class Activity {
    private readonly data: ActivityConfig;

    constructor(data: ActivityConfig = {}) {
        this.data = data;
    }

    public setActivity(activityId?: ActivityConfig['activityId']): this {
        this.data.activityId = activityId ?? undefined;
        return this;
    }

    public setChannel(channelId?: ActivityConfig['channelId']): this {
        this.data.channelId = channelId ?? undefined;
        return this;
    }

    public setToken(token?: ActivityConfig['token']): this {
        this.data.token = token ?? undefined;
        return this;
    }

    public async start(): Promise<Invite> {
        if (!this.data?.activityId) throw new Error(`Activity ID is required!`);
        if (!this.data?.channelId) throw new Error(`Channel ID is required!`);
        if (!this.data?.token) throw new Error(`Token is required!`);

        const res = await axios.post(`https://discord.com/api/v10/channels/${this.data.channelId}/invites`, {
            max_age: 86400,
            max_uses: 0,
            target_application_id: this.data.activityId,
            target_type: 2,
            temporary: false,
            validate: null,
        }, {
            headers: {
                Authorization: `Bot ${this.data.token}`,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw err;
        })

        if (!res.data) throw new Error("An error occured!");
        return res.data;
    }
}