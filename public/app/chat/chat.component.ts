import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BBCodeService } from './../global/bbcode.service';
import { ChatRoom, ChatMessage } from './../objects';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'app/chat/chat.component.html',
  providers: [ChatService, BBCodeService]
})

export class ChatComponent implements OnInit, OnDestroy {
  chats: ChatRoom[] = [];
  currentChatId: number;
  chatMessages: ChatMessage[];
  message: string;
  inputDisabled: boolean;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private bbcode: BBCodeService
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
    this.chatService.unsubscribe();
  }

  tabClassName(id: number): string {
    return this.currentChatId == id ? 'active' : '';
  }

  switchChatRooms(id: number): void {
    this.currentChatId = id;
    this.chatService.getMessages(id).then(chatMessages => {
      this.chatMessages = chatMessages;
      this.subscribe(id);
    });
  }

  subscribe(id: number): void {
    if(window['App'].chat) {
      this.chatService.unsubscribe();
    }

    window['App'].chat = window['App'].cable.subscriptions.create({ channel: 'ChatChannel', room: id }, {
      received: (data) => this.chatMessages.unshift(data.message as ChatMessage)
    });
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
}
