import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
  private cable: any = window['App'].cable;
  private channels: any = {
    home: { autoLoad: true,  data: { channel: 'HomeChannel' } },
    chat: { autoLoad: false, data: { channel: 'ChatChannel' } },
  };

  constructor() {
    for(let key in this.channels) {
      if(this.channels[key].autoLoad) this.init(key);
    }
  }

  init(name: string, data: any = {}): Observable<Array<number>> {
    let channel = this.channels[name];

    if(channel) {
      if(channel.observable) {
        return channel.observable;
      }
      else {
        return channel.observable = new Observable(observer => {
          Object.assign(channel.data, data);
          channel.instance = this.cable.subscriptions.create(channel.data, this.listeners(observer));
        });
      }
    }
  }

  destroy(name: string): void {
    let channel = this.channels[name];
    this.cable.subscriptions.remove(channel.instance);
    delete channel.observable;
    delete channel.instance;
  }

  private listeners(observer): any {
    return {
      received: (data) => observer.next(data)
    }
  }
}
