import { Client, Message } from 'discord.js';
import { BotFeature } from './BotFeature';
import { getRandomQuestion, createRandomPoll } from '../Util/Questions';

export class Poll implements BotFeature {
  initFeature(client: Client) {
    client.on('message', async (msg) => {
      const id = client.user?.id;
      if (id === undefined) return;

      if (msg.author.bot || !msg.content.includes(`<@!${id}>`)) return; // Only continue if bot is mentioned

      if (msg.content.toLowerCase().includes('provoke our thoughts')) {
        return this.provokeThoughts(msg);
      }

      if (msg.content.toLowerCase().includes('poll us')) {
        return await createRandomPoll(msg);
      }
    });
  }
  async provokeThoughts(msg: Message) {
    const randomQuestion = await getRandomQuestion(msg);
    return msg.channel.send(randomQuestion);
  }
}
