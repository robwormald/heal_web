import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ChatMessage } from './../../objects';

@Injectable()
export class ChatService {
  constructor(private http: Http) { }

  sendMessage(id: number, message: string): Promise<any> {
    return this.http.post(`api/chat/${id}`, { body: message }).toPromise()
      .catch(this.handleError);
  }

  getChats(): Promise<any> {
    return this.http.get('api/chat').toPromise()
      .then(function(response) { return response.json() })
      .catch(this.handleError);
  }

  getMessages(id: number): Promise<ChatMessage[]> {
    return this.http.get(`api/chat/${id}`).toPromise()
      .then(function(response) { return response.json() as ChatMessage[] })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
