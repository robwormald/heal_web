import { Component, OnInit } from '@angular/core';
import { Chat } from './chat';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'app/chat/chat.component.html',
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
  chats: Chat[];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChats().then(chats => this.chats = chats);
  }
}
