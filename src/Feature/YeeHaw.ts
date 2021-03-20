import { Client, Message } from "discord.js";
import { CustomEmojis } from "../Util/Emojis";
import { BotFeature } from "./BotFeature";
import { yeehaw } from 'yeehaw-matcher'

export class YeeHaw implements BotFeature {
    initFeature(client: Client): void {
        client.on('message', (message: Message) => {
            const lower = message.content.toLowerCase();
            if (yeehaw.test(lower)) {
                message.react(CustomEmojis.YEE)
                message.react(CustomEmojis.HAW)
            }
        })
    }


}