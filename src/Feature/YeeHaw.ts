import { Client, Message } from 'discord.js';
import { CustomEmojis } from '../Util/Emojis';
import { BotFeature } from './BotFeature';
import { yeehaw } from 'yeehaw-matcher';

export class YeeHaw implements BotFeature {
  featureName = 'yee-haw';
  helpText =
    'Insert a custom emoji whenever any message contains a similar phrase to "Yee Haw"';
  exampleCommand = [
    'Wow, today was great! Yee Haw!!!',
    'YEEEEEEEEEE hawwwwwwww',
  ];

  initFeature(client: Client): void {
    client.on('message', (message: Message) => {
      const lower = message.content.toLowerCase();
      if (yeehaw.test(lower)) {
        message.react(CustomEmojis.YEE);
        message.react(CustomEmojis.HAW);
      }
    });
  }
}
