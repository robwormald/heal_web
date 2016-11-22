import { Component, OnDestroy } from '@angular/core';
import { Store      } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ChatService } from './chat.service';
import { AppState, ChatRoom, ChatMessage } from './../../store/constants';
import { BBCodeService } from './../../shared/services/index';

@Component({
  moduleId: module.id,
  selector: 'chat-component',
  templateUrl: 'chat.component.html',
  providers: [ChatService]
})

export class ChatPageComponent implements OnDestroy {
  chatRoomList: any;
  chatMessageList: Observable<ChatMessage[]>;
  currentTab: string;
  tabs: string[];

  constructor(
    private store: Store<AppState>,
    private service: ChatService,
    private bbcode: BBCodeService,
  ) {
    this.store.select('chatRoomList')
      .subscribe(this.subscribeChatRoomList.bind(this));

    this.chatMessageList = this.store.select('chatMessageList');
    this.chatMessageList
      .filter((chatMessageList: ChatMessage[]) => !!chatMessageList.length)
      .subscribe(() => this.subscribeChatMessageList.bind(this));

    this.service.getChats();
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }

  switchChatRooms(tab: string): void {
    if(this.currentTab != tab) {
      this.currentTab = tab;
      this.service.getMessages(this.currentId());
    }
  }

  parseBBcode(message: ChatMessage): string {
    return message.parsed || (message.parsed = this.bbcode.parse(message.body))
  }

  onSend(event: any): void {
    this.service.sendMessage(this.currentId(), event);
  }

  private currentId(): number {
    return this.chatRoomList[this.currentTab];
  }

  private subscribeChatRoomList(chatRoomList: any): void {
    this.chatRoomList = chatRoomList;
    this.tabs = Object.keys(this.chatRoomList);
    this.currentTab = this.tabs[0];
    this.service.subscribe(this.currentId());
  }

  private subscribeChatMessageList(): void {
    this.service.unsubscribe();
    this.service.subscribe(this.currentId());
  }
}
