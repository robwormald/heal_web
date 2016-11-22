import { NgModule } from '@angular/core';

import {
  BBCodeService,
  WebsocketService,
  PollAnswerService,
  PollRenderService,
  EmojiSupportService,
} from './services/index';

@NgModule({
  providers: [
    BBCodeService,
    WebsocketService,
    PollAnswerService,
    PollRenderService,
    EmojiSupportService,
  ],
})

export class SharedServicesModule {}
