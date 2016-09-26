import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ChatRoom, ChatMessage } from './../objects';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'app/chat/chat.component.html',
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
  chats: ChatRoom[];
  chatMessages: ChatMessage[];

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chatService.getChats().then(chats => this.chats = chats);
    this.route.params.forEach((params: Params) => {
      this.chatService.getChat(params['id']).then(chatMessages => this.chatMessages = chatMessages);
    });
  }
}
