import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
  private websocket: any = window['App'];
  private cable: any = this.websocket.cable;
  private channels: any = {
    home: { channel: 'HomeChannel' },
    chat: { channel: 'ChatChannel' },
    appearance: { channel: 'AppearanceChannel' },
  };

  constructor() {
    for(let key in this.channels) {
      if(this.channels[key].autoLoad) this.init(key);
    }
  }

  init(name: string, data: any = {}): Observable<Array<number>> {
    let channelData = this.channels[name];
    let channel = this.websocket[name];

    if(channelData) {
      if(channel) {
        return channel.observable;
      }
      else {
        channel = this.websocket[name] = {};
        return channel.observable = new Observable(observer => {
          Object.assign(channelData, data);
          channel.instance = this.cable.subscriptions.create(channelData, this.listeners(observer));
        });
      }
    }
  }

  destroy(name: string): void {
    this.cable.subscriptions.remove(this.websocket[name].instance);
    this.websocket[name].subscription.unsubscribe();
    delete this.websocket[name];
  }

  perform(name: string, action: string, data: any = {}): void {
    this.websocket[name].instance.perform(action, data);
  }

  setSubscription(name: string, subscription: any): void {
    this.websocket[name].subscription = subscription;
  }

  private listeners(observer): any {
    return {
      connected: (data) => observer.next({ event: 'connected' }),
      received: (data) => observer.next(data)
    }
  }
}
