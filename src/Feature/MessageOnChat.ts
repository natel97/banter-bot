import { Client, VoiceState, TextChannel } from 'discord.js';
import { BotFeature } from './BotFeature';

export class MessageOnVoiceChat implements BotFeature {
  featureName = 'message-on-voice-chat';
  helpText = 'Get updates when someone enters chat';
  exampleCommand = [];

  initFeature(client: Client): void {
    client.on('voiceStateUpdate', async (before, after) => {
      const channel = await this.getTextChannel(client);
      if (channel === null || !client.user?.id) return;

      const message = this.getVoiceTextUpdate(before, after, client.user?.id);
      if (message !== null) {
        channel.send(message);
      }
    });
  }

  async getTextChannel(
    client: Client,
    channelId = process.env.BOT_CHANNEL
  ): Promise<TextChannel | null> {
    if (!channelId) return null;

    return client.channels.fetch(channelId) as Promise<TextChannel>;
  }

  getVoiceTextUpdate(
    before: VoiceState,
    after: VoiceState,
    me: string
  ): string | null {
    if (before.member?.id === me) return null;

    const afterNames = after.channel?.members
      .map((member) => member.displayName)
      .join(', ');
    const beforeNames = before.channel?.members
      .map((member) => member.displayName)
      .join(', ');

    if (!before.channel && after.channel) {
      return `${after.member?.displayName} has entered the ${after.channel.name} chat. Party time with ${afterNames}`;
    }
    if (before.channel && !after.channel) {
      return `${before.member?.displayName} has left the ${
        before.channel.name
      } chat. ${beforeNames ?? 'nobody'} remain`;
    }

    return `${before.member?.displayName} has moved from ${before.channel?.name} to ${after.channel?.name} is now empty /:sad:`;
  }
}
