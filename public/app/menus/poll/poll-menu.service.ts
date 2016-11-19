import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { WebsocketService } from './../../global/index';
import { PollRenderService } from './../../shared/services/poll-render.service';

import { AppState, PollView, SET_LATEST_POLL } from './../../store/constants';

@Injectable()
export class PollMenuService {
  latestPoll: PollView;
  connected: boolean = false;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private pollRender: PollRenderService,
    private store: Store<AppState>,
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
  }

  subscribe(): void {
    this.websocket.init(this.channel).subscribe(this.receive.bind(this));
  }

  private receive(res: any): any {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.connected = true;
          this.websocket.perform(this.channel, 'latest_poll');
        }
        break;
      case 'answered_poll':
        if(res.data.poll.id == this.latestPoll.poll.id) {
          this.store.dispatch({ type: SET_LATEST_POLL, payload: this.pollRender.getData(res.data, 'latestPoll') });
        }
        break;
      case 'latest_poll':
        this.store.dispatch({ type: SET_LATEST_POLL, payload: this.pollRender.getData(res.data, 'latestPoll') });
        break;
    }
  }
}
