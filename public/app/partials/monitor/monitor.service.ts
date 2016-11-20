import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { AppState, MONITOR_LIST } from './../../store/constants';
import { WebsocketService } from './../../global/index';

@Injectable()
export class MonitorPartialService {
  channel: string = 'home';
  connected: boolean = false;

  constructor(
    private websocket: WebsocketService,
    private store: Store<AppState>,
  ) {}

  subscribe(): void {
    let subscription = this.websocket.init(this.channel).subscribe(this.receive.bind(this));
    this.websocket.setSubscription(this.channel, subscription);
  }

  unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  private receive(res: any): void {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.connected = true;
          this.websocket.perform(this.channel, 'server_monitor');
        }
        break;
      case 'server_monitor':
        if(res.data) {
          this.store.dispatch({ type: MONITOR_LIST, payload: JSON.parse(res.data) });
        }
        break;
    }
  }
}
