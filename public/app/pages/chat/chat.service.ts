import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ChatMessage } from './../../objects';

@Injectable()
export class ChatService {
  constructor(private http: Http) { }

  sendMessage(id: number, message: string): Observable<any> {
    return this.http.post(`api/chat/${id}`, { body: message });
  }

  getChats(): Observable<any> {
    return this.http.get('api/chat').map(res => res.json());
  }

  getMessages(id: number): Observable<ChatMessage[]> {
    return this.http.get(`api/chat/${id}`).map(res => res.json() as ChatMessage[]);
  }
}
