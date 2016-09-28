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
  chats: ChatRoom[];
  chatMessages: ChatMessage[];
  chatRoomId: number;
  message: string;
  inputDisabled: boolean;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private bbcode: BBCodeService
  ) {}

  ngOnInit(): void {
    this.chatService.getChats().then(chats => this.chats = chats);

    this.route.params.forEach((params: Params) => {
      this.chatRoomId = params['id'];
      this.chatService.getMessages(this.chatRoomId).then(chatMessages => this.chatMessages = chatMessages);
      this.subscribe(this.chatRoomId);
    });
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribe();
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
    if(e && !e.ctrlKey && e.keyCode == 13) {
      this.onSend();
    }
  }

  parseBBcode(data: string): string {
    return this.bbcode.parse(data);
  }

  onSend(): void {
    if(!this.inputDisabled && this.message && this.message.length) {
      this.inputDisabled = true;
      this.chatService.sendMessage(this.chatRoomId, this.message).then(() => {
        this.message = '';
        this.inputDisabled = false;
      }).catch(() => this.inputDisabled = false);
    }
  }
}
