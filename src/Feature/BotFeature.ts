import { Client } from 'discord.js';

export interface BotFeature {
  initFeature(client: Client): void;
  featureName: string;
  helpText: string;
  exampleCommand: string[];
}
