import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import { Features } from './Feature';
config();

const intents = new Intents([
  Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
  'GUILD_MEMBERS', // lets you request guild members (i.e. fixes the issue)
]);
const client = new Client({ ws: { intents } });
client.login(process.env.TOKEN);

client.once('ready', () => {
  Features.featurelist.forEach((feature) => feature.initFeature(client));
});
