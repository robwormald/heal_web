import { Injectable } from '@angular/core';
import { Http       } from '@angular/http';
import { Store      } from '@ngrx/store';

import { WebsocketService } from './../../shared/services/index';
import { AppState, CHAT_ROOMS, CHAT_MESSAGES_LIST, CHAT_MESSAGES_NEW } from './../../store/constants';

@Injectable()
export class ChatService {
  channel: string = 'chat';

  constructor(
    private http: Http,
    private store: Store<AppState>,
    private websocket: WebsocketService
  ) {}

  subscribe(id: number): void {
    const subscription$ = this.websocket.init(this.channel, { room: id }).subscribe(this.received.bind(this));
    this.websocket.setSubscription(this.channel, subscription$);
  }

  unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  received(res: any): void {
    if(res.event === 'new_message') {
      this.store.dispatch({ type: CHAT_MESSAGES_NEW, payload: res.data.message });
    }
  }

  sendMessage(id: number, event: any): void {
    this.http.post(`api/chat/${id}`, { body: event.value })
      .subscribe(() => event.callback());
  }

  getChats(): void {
    this.http.get('api/chat')
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: CHAT_ROOMS, payload: res.chats });
        this.store.dispatch({ type: CHAT_MESSAGES_LIST, payload: res.messages });
      });
  }

  getMessages(id: number): void {
    this.http.get(`api/chat/${id}`)
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: CHAT_MESSAGES_LIST, payload: res.messages });
      });
  }
}
