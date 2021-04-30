import { BotFeature } from './BotFeature';
import { FeatureRequest } from './FeatureRequest';
import { Help } from './Help';
import { MessageOnVoiceChat } from './MessageOnChat';
import { Poll } from './Poll';
import { SoundInChat } from './SoundInChat';
import { UserOnboard } from './UserOnboard';
import { YeeHaw } from './YeeHaw';

export class Features {
  static featurelist: BotFeature[] = [
    new Poll(),
    new SoundInChat(),
    new MessageOnVoiceChat(),
    new UserOnboard(),
    new YeeHaw(),
    new FeatureRequest(),
    new Help(),
  ];
}

export {
  BotFeature,
  FeatureRequest,
  MessageOnVoiceChat,
  Poll,
  SoundInChat,
  UserOnboard,
  YeeHaw,
  Help,
};
