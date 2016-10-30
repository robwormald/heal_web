import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsPartialService {
  constructor(private http: Http) {}

  getComments(id: number, type: string): Observable<any> {
    let commentable = { id, type };
    return this.http.post(`api/comments/list`, { commentable }).map(res => res.json());
  }

  createComment(id: number, type: string, comment: string): Observable<any> {
    let commentable = { id, type, comment };
    return this.http.post(`api/comments`, { commentable }).map(res => res.json());
  }
}
