import { NgModule } from '@angular/core';

import { ArticleModule } from './article/article.module';
import { PollModule } from './poll/poll.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    ArticleModule,
    PollModule,
    UserModule,
  ],
})

export class PageModule {}
