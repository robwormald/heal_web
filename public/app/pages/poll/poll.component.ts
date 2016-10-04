import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  templateUrl: './poll.component.html',
  providers: [WebsocketService]
})

export class PollComponent implements OnInit, OnDestroy {
  channel: string = 'poll';

  constructor(private websocket: WebsocketService) {}

  ngOnInit(): void {
    let subscription = this.websocket.init(this.channel).subscribe();
    this.websocket.setSubscription(this.channel, subscription);
  }

  ngOnDestroy(): void {
    this.websocket.destroy(this.channel);
  }
}
