import { Client } from 'discord.js';
import { Features } from '.';
import { BotFeature } from './BotFeature';

export class Help implements BotFeature {
  exampleCommand = ['@banter-bot help', '@banter-bot help poll'];
  featureName = 'help';
  helpText = 'displays this help menu or help for a given command';

  initFeature(client: Client): void {
    client.on('message', (msg) => {
      const id = client.user?.id;
      if (
        id === undefined ||
        msg.author.bot ||
        !msg.content.includes(`<@!${id}>`) ||
        !msg.content.includes('help')
      )
        return; // Only continue if bot is mentioned

      msg.reply(this.buildMessage(msg.content));
    });
  }

  buildMessage(message: string) {
    const match = Features.featurelist.find((feature) =>
      message.includes(`help ${feature.featureName}`)
    );

    if (match) return this.buildFeatureMessage(match, true);

    return Features.featurelist
      .map((feature) => this.buildFeatureMessage(feature))
      .join('\n');
  }

  buildFeatureMessage(feature: BotFeature, includeExamples = false): string {
    const brief = `Feature ${feature.featureName}\t${feature.helpText}`;
    if (!includeExamples) return brief;

    if (!feature.exampleCommand.length)
      return `${brief}\nNo Examples Available`;

    return `${brief}\nExamples:\n${feature.exampleCommand.join('\n')}`;
  }
}
