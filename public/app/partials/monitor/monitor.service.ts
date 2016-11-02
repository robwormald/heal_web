import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

@Injectable()
export class MonitorPartialService {
  channel: string = 'home';
  connected: boolean = false;

  constructor(
    private websocket: WebsocketService,
    private store: AppStore,
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
          this.store.setKeyValue('serverMonitors', JSON.parse(res.data));
        }
        break;
    }
  }
}
