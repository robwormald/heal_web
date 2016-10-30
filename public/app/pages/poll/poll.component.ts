import { Component, OnDestroy } from '@angular/core';

import { WebsocketService } from './../../global/index';
import { PollService } from './poll.service';

@Component({
  moduleId: module.id,
  templateUrl: './poll.component.html',
  providers: [WebsocketService, PollService]
})

export class PollComponent implements OnDestroy {
  constructor(private pollService: PollService) {}

  ngOnDestroy(): void {
    this.pollService.unsubscribe();
  }
}
