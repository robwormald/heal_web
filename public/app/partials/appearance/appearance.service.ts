import { Injectable } from '@angular/core';

import { User } from './../../objects/index';
import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

@Injectable()
export class AppearanceService {
  channel: string = 'appearance';

  constructor(
    private websocket: WebsocketService,
    private store: AppStore,
  ) {}

  subscribe(): void {
    this.websocket.init(this.channel).subscribe(this.receive.bind(this));
  }

  unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  perform(url: string): void {
    let currentUser = this.store.getKeyValue('currentUser');
    if(currentUser && currentUser.location != url) {
      this.websocket.perform(this.channel, 'location', { location: url });
    }
  }

  private receive(res: any): any {
    switch(res.event) {
      case 'leave':
        this.removeUser(res.data.user);
        break;
      case 'list':
        this.store.setKeyValue('currentUser', res.data.user);
        this.store.setKeyValue('onlineUsers', res.data.users_list);
        break;
      case 'join':
      case 'update':
        this.updateUser(res.data.user);
        break;
    }
  }

  private removeUser(user: User): void {
    let users = this.store.getKeyValue('onlineUsers');
    let index = this.findUserIndex(user.id, users);
    users.splice(index, 1);

    this.store.setKeyValue('onlineUsers', users);
  }

  private updateUser(user: User): void {
    let users = this.store.getKeyValue('onlineUsers');
    let index = this.findUserIndex(user.id, users);

    if(index > -1) {
      users[index] = user;
      this.updateCurrentUser(user);
    }
    else {
      users.push(user);
    }

    this.store.setKeyValue('onlineUsers', users);
  }

  private updateCurrentUser(user: User): any {
    if(user.id == this.store.getKeyValue('currentUser').id) {
      this.store.setKeyValue('currentUser', user);
    }
  }

  private findUserIndex(id: number, users: User[]): any {
    return users.findIndex((user) => { return user.id == id; });
  }
}
