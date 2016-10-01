import { Component } from '@angular/core';

import { Poll } from './../objects/poll';
import { PollQuestion } from './../objects/poll-question';

import { WebsocketService } from './../global/websocket.service';

@Component({
  selector: 'poll-component',
  templateUrl: 'app/poll/poll.component.html',
  providers: [WebsocketService]
})

export class PollComponent {
  poll: Poll;
  questions: PollQuestion[];
  channel: string = 'home';

  constructor(private websocket: WebsocketService) {
    let subscription = this.websocket.init(this.channel).subscribe(this.received.bind(this));
    this.websocket.setSubscription(this.channel, subscription);
  }

  private received(res): void {
    switch(res.event) {
      case 'connected':
        this.websocket.perform(this.channel, 'latest_poll');
        break;
      case 'latest_poll':
        this.poll = res.data.poll as Poll;
        this.questions = res.data.questions as PollQuestion[];
        break;
    }
  }
}
