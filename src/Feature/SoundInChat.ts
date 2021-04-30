import { Client } from 'discord.js';
import { BotFeature } from './BotFeature';

export class SoundInChat implements BotFeature {
  featureName = 'sound-in-chat';
  helpText = 'Play a sound when someone enters the voice chat';
  exampleCommand = [];

  initFeature(client: Client) {
    client.on('voiceStateUpdate', async (before, after) => {
      if (before?.member?.id === client?.user?.id) return;
      if (before.channelID === null && after.channelID) {
        // Play startup noise :)
        const connection = await after?.channel?.join();
        if (!connection) return;

        const dispatch = connection.play('new-connection.mp3');
        dispatch.on('finish', () => connection.disconnect());
        dispatch.on('error', () => connection.disconnect());
      }
    });
  }
}
