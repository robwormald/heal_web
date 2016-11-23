export * from './bbcode.service';
export * from './emoji-support.service';
export * from './poll-answer.service';
export * from './poll-render.service';
export * from './websocket.service';

import { BBCodeService       } from './bbcode.service';
import { WebsocketService    } from './websocket.service';
import { PollAnswerService   } from './poll-answer.service';
import { PollRenderService   } from './poll-render.service';
import { EmojiSupportService } from './emoji-support.service';

export const ALL_SERVICES = [
  BBCodeService,
  WebsocketService,
  PollAnswerService,
  PollRenderService,
  EmojiSupportService,
];
