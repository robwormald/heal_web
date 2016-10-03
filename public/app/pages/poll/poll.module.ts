import { NgModule } from '@angular/core';

import { routing           } from './poll.routing';
import { SharedModule      } from './../../shared/modules/shared.module';
import { PollComponent     } from './poll.component';
import { PollHomeComponent } from './poll-home.component';
import { PollViewComponent } from './poll-view.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    PollComponent,
    PollHomeComponent,
    PollViewComponent,
  ],
  exports: [PollComponent],
})

export class PollModule {}
