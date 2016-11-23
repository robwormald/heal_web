// export * from './chat/chat.component';

import { ArticleModule } from './article/article.module';
import { PollModule } from './poll/poll.module';
import { UserModule } from './user/user.module';

export const ALL_PAGES = [
  ArticleModule,
  PollModule,
  UserModule,
];
