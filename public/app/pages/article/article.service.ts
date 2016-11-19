import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { AppState, SET_ARTICLE_LIST, SET_CURRENT_ARTICLE } from './../../store/constants';

@Injectable()
export class ArticleService {
  constructor(
    private store: Store<AppState>,
    private http: Http
  ) {}

  getArticles(page: number): void {
    this.http.get(`api/article/list/${page}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_ARTICLE_LIST, payload: res })
      );
  }

  getArticle(id: number): void {
    this.http.get(`api/article/view/${id}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_CURRENT_ARTICLE, payload: res.article })
      );
  }
}
