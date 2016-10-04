import { Component, OnInit } from '@angular/core';

import { Poll } from './../../objects/index';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'poll-home-component',
  templateUrl: './poll-home.component.html'
})

export class PollHomeComponent implements OnInit {
  polls: Poll[] = [];
  connected: boolean = false;
  totalCount: number = 0;
  channel: string = 'poll';

  constructor(private websocket: WebsocketService) {}

  ngOnInit(): void {
    this.websocket.init(this.channel).subscribe(this.received.bind(this));
    if(this.websocket.isConnected(this.channel)) {
      this.connected = true;
      this.getList(1);
    }
  }

  private getList(page): void {
    this.websocket.perform(this.channel, 'poll_list', { page: page });
  }

  private received(res: any): void {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.getList(1);
        }
        break;
      case 'poll_list':
        this.polls = res.data.polls as Poll[];
        this.totalCount = res.data.totalCount;
        break;
    }
  }
}
