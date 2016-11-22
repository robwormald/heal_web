import { NgModule } from '@angular/core';

import { BBCodePartialComponent     } from './bbcode/bbcode.component';
import { ContainerPartialComponent  } from './container/container.component';
import { PollPartialComponent       } from './poll/poll.component';
import { PaginationPartialComponent } from './pagination/pagination.component';
import { RatePartialComponent       } from './rate/rate.component';
import { ModalPartialComponent      } from './modal/modal.component';
import { UserPartialComponent       } from './user/user.component';
import { CommentsPartialComponent   } from './comments/comments.component';
import { TextareaPartialComponent   } from './textarea/textarea.component';
import { DatePartialComponent       } from './date/date.component';
import { MonitorPartialComponent    } from './monitor/monitor.component';
import { FormPartialComponent       } from './form/form.component';
import { FilePartialComponent       } from './file/file.component';
import { TabsPartialComponent       } from './tabs/tabs.component';

@NgModule({
  declarations: [
    BBCodePartialComponent,
    ContainerPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
    CommentsPartialComponent,
    TextareaPartialComponent,
    DatePartialComponent,
    MonitorPartialComponent,
    FormPartialComponent,
    FilePartialComponent,
    TabsPartialComponent,
  ],
  exports: [
    BBCodePartialComponent,
    ContainerPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
    CommentsPartialComponent,
    TextareaPartialComponent,
    DatePartialComponent,
    MonitorPartialComponent,
    FormPartialComponent,
    FilePartialComponent,
    TabsPartialComponent,
  ],
})

export class PartialModule {}
