import { Client, Message, User } from 'discord.js';
import { BotFeature } from './BotFeature';

import { Octokit } from '@octokit/rest';

export class FeatureRequest implements BotFeature {
  featureRequestCommand = 'request feature ';
  initFeature(client: Client): void {
    const id = client.user?.id;
    const api = new Octokit({ auth: process.env.BOT_GITHUB_TOKEN });

    client.on('message', (message) => {
      if (!message.content.includes(`<@!${id}>`)) return;

      const lower = message.content.toLowerCase();

      if (lower.includes(this.featureRequestCommand)) {
        this.getFeatureDetails(api, message, lower);
      }
    });
  }

  async getFeatureDetails(api: Octokit, message: Message, lower: string) {
    const title = lower.split(this.featureRequestCommand)[1];

    const issue = await api.issues.create({
      owner: process.env.REPO_OWNER || '',
      repo: process.env.REPO_REPO || '',
      title: `[DISCORD CHAT] ${title}`,
      body: `Requested at ${new Date().toUTCString()} by ${
        message.author.username
      } in discord.`,
    });

    message.reply(`Created issue ${title}\n${issue.data.url}`);
  }
}
