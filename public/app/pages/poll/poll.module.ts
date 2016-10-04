import { NgModule } from '@angular/core';

import { routing           } from './poll.routing';
import { SharedModule      } from './../../shared/modules/shared.module';
import { PollComponent     } from './poll.component';
import { PollListComponent } from './poll-list.component';
import { PollViewComponent } from './poll-view.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    PollComponent,
    PollListComponent,
    PollViewComponent,
  ],
  exports: [PollComponent],
})

export class PollModule {}
