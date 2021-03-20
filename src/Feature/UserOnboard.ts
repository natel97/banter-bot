import { Client } from 'discord.js';
import { BotFeature } from './BotFeature';

export class UserOnboard implements BotFeature {
  initFeature(client: Client): void {
    client.on('guildMemberAdd', (member) => {
      member.send('Welcome to the server! Say Hi /:wave:');
    });
  }
}
