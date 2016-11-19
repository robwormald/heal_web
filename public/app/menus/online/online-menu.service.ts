import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

import { AppState, User, SET_CURRENT_USER, SET_ONLINE_USERS, ADD_ONLINE_USER, REMOVE_ONLINE_USER, UPDATE_ONLINE_USER } from './../../store/constants';

@Injectable()
export class OnlineMenuService {
  currentUser: User;
  channel: string = 'appearance';

  constructor(
    private websocket: WebsocketService,
    private store: AppStore,
    private newStore: Store<AppState>
  ) {
    this.newStore.select('currentUser').subscribe((user: User) => this.currentUser = user);
  }

  subscribe(): void {
    this.websocket.init(this.channel).subscribe(this.receive.bind(this));
  }

  unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  perform(url: string): void {
    if(this.currentUser && this.currentUser.location != url) {
      this.websocket.perform(this.channel, 'location', { location: url });
    }
  }

  private receive(res: any): any {
    switch(res.event) {
      case 'leave':
        this.newStore.dispatch({ type: REMOVE_ONLINE_USER, payload: res.data.user });
        break;
      case 'list':
        this.newStore.dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
        this.newStore.dispatch({ type: SET_ONLINE_USERS, payload: res.data.users_list });
        this.store.setKeyValue('currentUser', res.data.user);
        break;
      case 'join':
        this.newStore.dispatch({ type: ADD_ONLINE_USER, payload: res.data.user });
      case 'update':
        this.newStore.dispatch({ type: UPDATE_ONLINE_USER, payload: res.data.user });
        break;
    }
  }
}
