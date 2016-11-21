import { Injectable } from '@angular/core';
import { Store      } from '@ngrx/store';

import { WebsocketService   } from './../global/index';
import { PollRenderService  } from './../shared/services/poll-render.service';
import {
  AppState, PollView,
  MONITOR_LIST, SET_CURRENT_POLL, SET_LATEST_POLL, REMOVE_ONLINE_USER, SET_CURRENT_USER, SET_ONLINE_USERS, ADD_ONLINE_USER, UPDATE_ONLINE_USER
} from './../store/constants';

@Injectable()
export class HomeChannel {
  latestPoll: PollView;
  currentPoll: PollView;
  channel: string = 'home';
  connected: boolean = false;

  constructor(
    private websocket: WebsocketService,
    private pollService: PollRenderService,
    private store: Store<AppState>
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
    this.store.select('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);
  }

  subscribe(): void {
    const subscription$ = this.websocket.init(this.channel).subscribe(this.receive.bind(this));
    this.websocket.setSubscription(this.channel, subscription$);
  }

  unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  perform(action: string, data: any = {}): void {
    this.websocket.perform(this.channel, action, data);
  }

  private receive(res: any): any {
    console.error(res);
    switch(res.event) {
      case 'connected':
        return this.action_connected();
      case 'server_monitor':
        return this.action_server_monitor(res.data);
      case 'answered_poll':
        return this.action_answer_poll(res.data);
      case 'latest_poll':
        return this.action_latest_poll(res.data);
      case 'update_current_user':
        return this.action_update_current_user(res.data);
      case 'online_leave':
        return this.action_leave_channel(res.data);
      case 'online_join':
        return this.action_join_channel(res.data);
      case 'list_online_users':
        return this.action_list_online_users(res.data);
      case 'update_online_users':
        return this.action_update_online_users(res.data);
    }
  }

  private action_connected(): void {
    if(!this.connected) {
      this.connected = true;
      this.websocket.perform(this.channel, 'joined_channel');
      this.websocket.perform(this.channel, 'server_monitor');
      this.websocket.perform(this.channel, 'latest_poll');
    }
  }

  private action_server_monitor(data: any): void {
    this.store.dispatch({ type: MONITOR_LIST, payload: data });
  }

  private action_answer_poll(data: any): void {
    if(this.currentPoll.poll && data.poll.id === this.currentPoll.poll.id) {
      this.store.dispatch({ type: SET_CURRENT_POLL, payload: this.pollService.getData(data, 'currentPoll') });
    }
    if(this.latestPoll.poll && data.poll.id === this.latestPoll.poll.id) {
      this.store.dispatch({ type: SET_LATEST_POLL, payload: this.pollService.getData(data, 'latestPoll') });
    }
  }

  private action_latest_poll(data: any): void {
    this.store.dispatch({ type: SET_LATEST_POLL, payload: this.pollService.getData(data, 'latestPoll') });
  }

  private action_update_current_user(data: any): void {
    this.store.dispatch({ type: SET_CURRENT_USER, payload: data.user });
  }

  private action_leave_channel(data: any): void {
    this.store.dispatch({ type: REMOVE_ONLINE_USER, payload: data.user });
  }

  private action_join_channel(data: any): void {
    this.store.dispatch({ type: ADD_ONLINE_USER, payload: data.user });
  }

  private action_list_online_users(data: any): void {
    this.store.dispatch({ type: SET_CURRENT_USER, payload: data.user });
    this.store.dispatch({ type: SET_ONLINE_USERS, payload: data.users_list });
  }

  private action_update_online_users(data: any): void {
    this.store.dispatch({ type: UPDATE_ONLINE_USER, payload: data.user });
  }

}
