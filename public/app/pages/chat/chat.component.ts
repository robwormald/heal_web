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
    this.chatService.getChats().subscribe((result) => {
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
      this.chatService.getMessages(id).subscribe((chatMessages) => {
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
      this.chatService.sendMessage(this.currentChatId, this.message).subscribe(() => {
        this.message = '';
        this.inputDisabled = false;
      });
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
