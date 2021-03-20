import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import { BotFeature } from './Feature/BotFeature';
import { FeatureRequest } from './Feature/FeatureRequest';
import { MessageOnVoiceChat } from './Feature/MessageOnChat';
import { Poll } from './Feature/Poll';
import { SoundInChat } from './Feature/SoundInChat';
import { UserOnboard } from './Feature/UserOnboard';
import { YeeHaw } from './Feature/YeeHaw';
config();

const intents = new Intents([
  Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
  'GUILD_MEMBERS', // lets you request guild members (i.e. fixes the issue)
]);
const client = new Client({ ws: { intents } });
client.login(process.env.TOKEN);

const features: BotFeature[] = [
  new Poll(),
  new SoundInChat(),
  new MessageOnVoiceChat(),
  new UserOnboard(),
  new YeeHaw(),
  new FeatureRequest(),
];
client.once('ready', () => {
  features.forEach((feature) => feature.initFeature(client));
});
