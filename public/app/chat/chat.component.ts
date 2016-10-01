import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatRoom, ChatMessage } from './../objects';

import { WebsocketService } from './../global/websocket.service';
import { BBCodeService } from './../global/bbcode.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'app/chat/chat.component.html',
  providers: [ChatService, BBCodeService, WebsocketService]
})

export class ChatComponent implements OnInit, OnDestroy {
  chats: ChatRoom[] = [];
  currentChatId: number;
  chatMessages: ChatMessage[];
  message: string;
  inputDisabled: boolean;
  channel: string = 'chat';

  constructor(
    private chatService: ChatService,
    private bbcode: BBCodeService,
    private websocket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.chatService.getChats().then(result => {
      this.chats = result.chats as ChatRoom[];
      this.chatMessages = result.messages as ChatMessage[];
      this.currentChatId = this.chats[0].id;
      this.subscribe(this.currentChatId);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  tabClassName(id: number): string {
    return this.currentChatId == id ? 'active' : '';
  }

  switchChatRooms(id: number): void {
    if(this.currentChatId != id) {
      this.currentChatId = id;
      this.chatService.getMessages(id).then(chatMessages => {
        this.chatMessages = chatMessages;
        this.unsubscribe();
        this.subscribe(id);
      });
    }
  }

  onKeyPress(e): void {
    if(e && !e.ctrlKey && !e.shiftKey && e.keyCode == 13) {
      this.onSend();
    }
  }

  parseBBcode(message: ChatMessage): string {
    return message.parsed || (message.parsed = this.bbcode.parse(message.body))
  }

  onSend(): void {
    if(!this.inputDisabled && this.message && this.message.length) {
      this.inputDisabled = true;
      this.chatService.sendMessage(this.currentChatId, this.message).then(() => {
        this.message = '';
        this.inputDisabled = false;
      }).catch(() => this.inputDisabled = false);
    }
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
