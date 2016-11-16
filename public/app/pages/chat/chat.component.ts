import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from './chat.service';
import { ChatRoom, ChatMessage } from './../../objects/index';
import { BBCodeService, WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'chat-component',
  templateUrl: 'chat.component.html',
  providers: [ChatService, BBCodeService, WebsocketService]
})

export class ChatPageComponent implements OnInit, OnDestroy {
  chats: ChatRoom[] = [];
  chatMessages: ChatMessage[];
  currentTab: string;
  tabsObject: any;
  tabsArray: string[];
  channel: string = 'chat';

  constructor(
    private chatService: ChatService,
    private bbcode: BBCodeService,
    private websocket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.chatService.getChats().subscribe((result) => {
      this.chats = result.chats as ChatRoom[];
      this.chatMessages = result.messages as ChatMessage[];
      this.mapChatsToTabs();
      this.subscribe(this.chats[0].id);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  switchChatRooms(tab: string): void {
    if(this.currentTab != tab) {
      let id:number = this.tabsObject[tab];
      this.currentTab = tab;

      this.chatService.getMessages(id).subscribe((chatMessages) => {
        this.chatMessages = chatMessages;
        this.unsubscribe();
        this.subscribe(id);
      });
    }
  }

  parseBBcode(message: ChatMessage): string {
    return message.parsed || (message.parsed = this.bbcode.parse(message.body))
  }

  onSend(event: any): void {
    this.chatService.sendMessage(this.tabsObject[this.currentTab], event.value)
      .finally(() => event.callback())
      .subscribe();
  }

  private mapChatsToTabs(): void {
    this.tabsObject = {};
    this.tabsArray = this.chats.map((chat) => {
      this.tabsObject[chat.title] = chat.id
      return chat.title;
    });
    this.currentTab = this.tabsArray[0];
  }

  private subscribe(id: number): void {
    let subscription = this.websocket.init(this.channel, { room: id }).subscribe(this.received.bind(this));
    this.websocket.setSubscription(this.channel, subscription);
  }

  private unsubscribe(): void {
    this.websocket.destroy(this.channel);
  }

  private received(res: any): void {
    if(res.event == 'new_message') {
      this.chatMessages.unshift(res.data.message as ChatMessage);
    }
  }
}
