import { Client, Message } from "discord.js";
import { BotFeature } from "./BotFeature";
import { getRandomQuestion, createRandomPoll } from '../Util/Questions';

enum CustomEmojis {
    YEE = '821810518376972308',
    HAW = '821810566627590245'
}

export class Poll implements BotFeature {
    initFeature(client: Client) {
        client.on("message", async (msg) => {
            const id = client.user?.id
            if (id === undefined) return;

            if (msg.author.bot || !msg.content.includes(`<@!${id}>`)) return; // Only continue if bot is mentioned

            if (msg.content.toLowerCase().includes("provoke our thoughts")) {
                return this.provokeThoughts(msg);
            }

            if (msg.content.toLowerCase().includes("poll us")) {
                return await createRandomPoll(msg);
            }

            msg.react(CustomEmojis.YEE)
            msg.react(CustomEmojis.HAW)
        });
    }
    async provokeThoughts(msg: Message) {
        const randomQuestion = await getRandomQuestion(
            msg
        );
        return msg.channel.send(randomQuestion);
    }

}