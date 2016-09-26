import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ChatRoom, ChatMessage } from './../objects';

@Injectable()
export class ChatService {
  constructor(private http: Http) { }

  getChats(): Promise<ChatRoom[]> {
    return this.http.get('api/chat').toPromise()
      .then(function(response) { return response.json() as ChatRoom[] })
      .catch(this.handleError);
  }

  getChat(id: number): Promise<ChatMessage[]> {
    return this.http.get(`api/chat/${id}`).toPromise()
      .then(function(response) { return response.json() as ChatMessage[] })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
