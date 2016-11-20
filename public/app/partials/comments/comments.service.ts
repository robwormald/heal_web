import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { AppState, Comment, COMMENT_LIST, COMMENT_CREATE, COMMENT_DELETE, COMMENT_EDIT, COMMENT_UPDATE, COMMENT_CURRENT } from './../../store/constants';

@Injectable()
export class CommentsPartialService {
  constructor(
    private store: Store<AppState>,
    private http: Http
  ) {}

  getComments(id: number, type: string): void {
    let commentable = { id, type };
    this.http.post(`api/comments/list`, { commentable })
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: COMMENT_LIST, payload: res.comments });
      });
  }

  create(id: number, type: string, event: any): void {
    let commentable = { id, type, comment: event.value };
    this.http.post(`api/comments`, { commentable })
      .map(res => res.json())
      .subscribe((res) => {
        event.callback();
        this.store.dispatch({ type: COMMENT_CREATE, payload: res.comments });
      });
  }

  destroy(comment_id: number): void {
    this.http.delete(`api/comments/${comment_id}`)
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: COMMENT_DELETE, payload: res.comments });
      });
  }

  current(comments: Comment[], rateData: any): void {
    this.store.dispatch({ type: COMMENT_CURRENT, payload: { comments, rateData } });
  }

  edit(comment: Comment, editing: boolean): void {
    this.store.dispatch({ type: COMMENT_EDIT, payload: { comment, editing } });
  }

  update(comment_id: number, body: string): void {
    this.http.put(`api/comments/${comment_id}`, { body })
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: COMMENT_UPDATE, payload: res.comments });
      });
  }
}
