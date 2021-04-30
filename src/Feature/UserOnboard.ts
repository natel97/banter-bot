import { Client } from 'discord.js';
import { BotFeature } from './BotFeature';

export class UserOnboard implements BotFeature {
  serverMessage = 'Welcome to the server! Say Hi /:wave:';

  featureName = 'user-onboard';
  helpText =
    'Message a user when they join the server. Message is the following: ' +
    this.serverMessage;
  exampleCommand = [
    '@banter-bot request feature ...',
    '@banter-bot request feature help command',
  ];

  initFeature(client: Client): void {
    client.on('guildMemberAdd', (member) => {
      member.send(this.serverMessage);
    });
  }
}
