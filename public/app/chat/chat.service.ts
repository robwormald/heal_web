import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Chat } from './chat'

@Injectable()
export class ChatService {
  constructor(private http: Http) { }

  getChats(): Promise<Chat[]> {
    return this.http.get('api/chat').toPromise()
      .then(function(response) { return response.json() as Chat[] })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
